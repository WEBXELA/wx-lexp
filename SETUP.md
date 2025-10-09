# Production Setup Guide

Complete setup instructions for the Social Media Profile Search Application.

## 🚀 Quick Setup

### 1. Environment Configuration

Create a `.env` file in the root directory:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://xbrjcahwnjuvuljdehjf.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhicmpjYWh3bmp1dnVsamRlaGpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk5MDQwNTYsImV4cCI6MjA3NTQ4MDA1Nn0.A97nCypL3OdxRf8tpVdkCqJUjMudXY-0ItwNXRjAXrM
VITE_SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhicmpjYWh3bmp1dnVsamRlaGpmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTkwNDA1NiwiZXhwIjoyMDc1NDgwMDU2fQ.iFqQB3zeZpHtOFFuSfTeB9Gml2NZhlbYiHU3B-R_UWg
```

### 2. Database Setup

Run the **final production migration** in your Supabase SQL Editor:

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Click **"New query"**
4. Copy and paste the contents of `supabase/migrations/20250127200000_final_production_setup.sql`
5. Click **"Run"**

### 3. Start the Application

```bash
npm install
npm run dev
```

The application will be available at `http://localhost:5173`

## 📊 Database Schema

### Tables Created

#### `subscriptions`
- **Purpose**: Track user subscription plans and status
- **Fields**:
  - `id` (uuid, primary key)
  - `user_id` (uuid, references auth.users)
  - `plan` (text: 'free', 'premium', 'pro')
  - `status` (text: 'active', 'inactive')
  - `current_period_start` (timestamptz)
  - `current_period_end` (timestamptz)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

#### `user_searches`
- **Purpose**: Track daily search usage per user
- **Fields**:
  - `id` (uuid, primary key)
  - `user_id` (uuid, references auth.users)
  - `search_date` (date)
  - `search_count` (int)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

### Functions Created

#### `increment_search_count(user_uuid)`
- **Purpose**: Increment user's daily search count
- **Usage**: Called after each successful search
- **Returns**: void

#### `get_daily_search_count(user_uuid)`
- **Purpose**: Get user's current daily search count
- **Usage**: Check current usage before allowing search
- **Returns**: int (current count)

#### `can_user_search(user_uuid)`
- **Purpose**: Check if user can perform more searches
- **Usage**: Validate search permissions
- **Returns**: boolean

#### `handle_new_user()`
- **Purpose**: Automatically create subscription and search tracking for new users
- **Usage**: Triggered on user registration
- **Returns**: trigger

## 🔒 Security Features

### Row Level Security (RLS)
- **Enabled on all tables**
- **User Isolation**: Users can only access their own data
- **Authentication Required**: All operations require valid user session

### Policies
- **View Own Data**: Users can only view their own subscriptions and search history
- **Update Own Data**: Users can only update their own records
- **Insert Own Data**: Users can only insert records for themselves

## 📈 Search Limits

### Plan Limits
- **Free Plan**: 10 searches per day
- **Premium Plan**: 100 searches per day
- **Pro Plan**: 1000 searches per day

### Implementation
- **Daily Reset**: Limits reset at midnight
- **Real-time Tracking**: Usage tracked in real-time
- **Automatic Enforcement**: Limits enforced at API level
- **User Feedback**: Clear messaging when limits reached

## 🛠️ Development Features

### Search Integration
- **Multi-Platform**: LinkedIn, Instagram, Facebook, Twitter
- **Advanced Filters**: Job title, location, industry, skills, etc.
- **Pagination**: Efficient handling of large result sets
- **Export**: Excel export for admin users

### User Experience
- **Responsive Design**: Works on all device sizes
- **Loading States**: Proper loading indicators
- **Error Handling**: Comprehensive error messages
- **Real-time Updates**: Live search count updates

## 🔧 Configuration Options

### Environment Variables
```env
# Required
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Optional (for admin features)
VITE_SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### Google Custom Search (Optional)
Update in `src/api/searchProfiles.ts`:
```typescript
const GOOGLE_API_KEY = 'your_google_api_key';
const SEARCH_ENGINE_ID = 'your_search_engine_id';
```

## 🚀 Deployment

### Vercel (Recommended)
1. Connect GitHub repository
2. Set environment variables
3. Deploy automatically

### Netlify
1. Connect repository
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Set environment variables

### Manual
1. `npm run build`
2. Upload `dist` folder to hosting
3. Configure environment variables

## 🐛 Troubleshooting

### Common Issues

#### "Missing Supabase environment variables"
- Ensure `.env` file exists in root directory
- Check that all required variables are set
- Restart development server after changes

#### "Search limit reached" error
- Check user's subscription plan
- Verify search count in database
- Ensure RLS policies are correctly set

#### Database connection issues
- Verify Supabase URL and keys
- Check if migration was run successfully
- Ensure user is authenticated

### Debug Mode
Enable debug logging by adding to `.env`:
```env
VITE_DEBUG=true
```

## 📞 Support

For technical support:
- **Email**: admin@webxela.com
- **GitHub Issues**: Create an issue in the repository

## 🔄 Updates

### Recent Changes
- ✅ Updated search limits to 10 for free users
- ✅ Integrated search limit enforcement
- ✅ Added comprehensive error handling
- ✅ Improved user experience with real-time feedback
- ✅ Created production-ready database schema

### Next Steps
- Monitor search usage and performance
- Add analytics and reporting features
- Implement advanced search filters
- Add bulk export functionality

---

**Note**: This setup is production-ready and includes all necessary security measures. Always test in a staging environment before deploying to production.