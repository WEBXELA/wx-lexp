# Deployment Guide

Complete deployment instructions for the Social Media Profile Search Application.

## 🚀 Production Deployment

### Prerequisites
- Supabase project with production database
- Domain name (optional)
- Hosting provider account (Vercel, Netlify, etc.)

### 1. Environment Setup

#### Production Environment Variables
```env
# Supabase Production Configuration
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your_production_anon_key
VITE_SUPABASE_SERVICE_ROLE_KEY=your_production_service_role_key

# Optional: Analytics and Monitoring
VITE_APP_ENV=production
VITE_APP_VERSION=1.0.0
```

#### Google Custom Search API
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Enable Custom Search API
3. Create API credentials
4. Create a Custom Search Engine
5. Update API keys in `src/api/searchProfiles.ts`

### 2. Database Migration

#### Run Production Migration
1. Access your Supabase project dashboard
2. Go to **SQL Editor**
3. Run the final migration:
   ```sql
   -- Copy contents from supabase/migrations/20250127200000_final_production_setup.sql
   ```

#### Verify Database Setup
```sql
-- Check tables exist
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('subscriptions', 'user_searches');

-- Check functions exist
SELECT routine_name FROM information_schema.routines 
WHERE routine_schema = 'public' 
AND routine_name IN ('increment_search_count', 'get_daily_search_count', 'can_user_search');
```

### 3. Build Configuration

#### Vite Configuration
Ensure `vite.config.ts` is optimized for production:
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          supabase: ['@supabase/supabase-js'],
          ui: ['framer-motion', 'lucide-react']
        }
      }
    }
  },
  server: {
    host: true,
    port: 5173,
    strictPort: true,
  }
});
```

#### Package.json Scripts
```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0"
  }
}
```

## 🌐 Hosting Options

### Option 1: Vercel (Recommended)

#### Setup
1. Connect GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Set build settings:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

#### Environment Variables in Vercel
```
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your_production_anon_key
VITE_SUPABASE_SERVICE_ROLE_KEY=your_production_service_role_key
```

#### Custom Domain (Optional)
1. Add domain in Vercel dashboard
2. Update DNS records
3. Configure SSL certificate

### Option 2: Netlify

#### Setup
1. Connect repository to Netlify
2. Configure build settings:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
   - **Node Version**: 18

#### Environment Variables in Netlify
Same as Vercel configuration above.

#### Redirects Configuration
Create `public/_redirects`:
```
/*    /index.html   200
```

### Option 3: Manual Deployment

#### Build Process
```bash
# Install dependencies
npm install

# Build for production
npm run build

# Preview build locally
npm run preview
```

#### Upload to Hosting
1. Upload `dist` folder contents to your hosting provider
2. Configure web server to serve SPA
3. Set up environment variables

#### Nginx Configuration
```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
```

## 🔒 Security Configuration

### Supabase Security
1. **Enable RLS**: Ensure Row Level Security is enabled
2. **API Keys**: Use production keys only
3. **CORS**: Configure allowed origins
4. **Rate Limiting**: Set up rate limiting in Supabase

### Application Security
1. **Environment Variables**: Never commit `.env` files
2. **API Keys**: Rotate keys regularly
3. **HTTPS**: Always use HTTPS in production
4. **Headers**: Set security headers

### Database Security
```sql
-- Verify RLS is enabled
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public';

-- Check policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE schemaname = 'public';
```

## 📊 Monitoring & Analytics

### Supabase Monitoring
1. **Dashboard**: Monitor database performance
2. **Logs**: Check authentication and API logs
3. **Metrics**: Track usage and performance

### Application Monitoring
1. **Error Tracking**: Implement error tracking (Sentry, etc.)
2. **Analytics**: Add user analytics (Google Analytics, etc.)
3. **Performance**: Monitor Core Web Vitals

### Health Checks
Create a health check endpoint:
```typescript
// src/api/health.ts
export async function healthCheck() {
  try {
    const { data, error } = await supabase
      .from('subscriptions')
      .select('count')
      .limit(1);
    
    return {
      status: 'healthy',
      database: error ? 'error' : 'connected',
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    return {
      status: 'unhealthy',
      error: error.message,
      timestamp: new Date().toISOString()
    };
  }
}
```

## 🔄 CI/CD Pipeline

### GitHub Actions
Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

### Environment Variables in CI/CD
- `VERCEL_TOKEN`: Vercel deployment token
- `ORG_ID`: Vercel organization ID
- `PROJECT_ID`: Vercel project ID

## 🧪 Testing

### Pre-deployment Checklist
- [ ] Environment variables configured
- [ ] Database migration completed
- [ ] Build process successful
- [ ] All features working
- [ ] Security policies active
- [ ] Performance optimized

### Post-deployment Testing
1. **Authentication**: Test login/signup
2. **Search Functionality**: Test all search features
3. **Search Limits**: Verify limit enforcement
4. **Export**: Test admin export features
5. **Responsive**: Test on different devices

## 📈 Performance Optimization

### Build Optimization
- **Code Splitting**: Automatic with Vite
- **Tree Shaking**: Remove unused code
- **Minification**: Terser minification
- **Compression**: Gzip/Brotli compression

### Runtime Optimization
- **Lazy Loading**: Load components on demand
- **Caching**: Implement proper caching strategies
- **CDN**: Use CDN for static assets
- **Database**: Optimize queries and indexes

## 🆘 Troubleshooting

### Common Issues

#### Build Failures
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

#### Database Connection Issues
- Verify Supabase URL and keys
- Check network connectivity
- Verify RLS policies

#### Search Not Working
- Check Google Custom Search API
- Verify API keys and quotas
- Check browser console for errors

### Debug Mode
Enable debug logging:
```env
VITE_DEBUG=true
VITE_LOG_LEVEL=debug
```

## 📞 Support

For deployment support:
- **Email**: admin@webxela.com
- **Documentation**: Check this guide and README.md
- **Issues**: Create GitHub issue for bugs

---

**Note**: Always test deployments in a staging environment before deploying to production. Keep backups of your database and configuration files.
