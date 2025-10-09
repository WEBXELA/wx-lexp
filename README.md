# Social Media Profile Search App

A powerful React-based application for searching and discovering social media profiles across multiple platforms including LinkedIn, Instagram, Facebook, and Twitter. Built with modern technologies and integrated with Supabase for authentication and data management.

## 🚀 Features

### Core Functionality
- **Multi-Platform Search**: Search profiles across LinkedIn, Instagram, Facebook, and Twitter
- **Advanced Filtering**: Filter by job title, location, industry, company size, skills, and more
- **Profile Export**: Export search results to Excel format (admin feature)
- **Real-time Search**: Fast and responsive search with pagination
- **Responsive Design**: Mobile-first design that works on all devices

### User Management
- **Authentication**: Secure user registration and login with Supabase Auth
- **Subscription Plans**: Free, Premium, and Pro tiers with different search limits
- **Search Limits**: 
  - Free: 10 searches per day
  - Premium: 100 searches per day
  - Pro: 1000 searches per day
- **Usage Tracking**: Real-time tracking of daily search usage

### Technical Features
- **Row Level Security**: Secure data isolation between users
- **Automatic User Setup**: New users automatically get free subscriptions
- **Search Limit Enforcement**: Built-in protection against abuse
- **Error Handling**: Comprehensive error handling and user feedback

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, Framer Motion
- **Backend**: Supabase (PostgreSQL, Auth, RLS)
- **State Management**: React Query
- **Icons**: Lucide React
- **Export**: XLSX library

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account
- Google Custom Search API key (for profile search)

## 🚀 Quick Start

### 1. Clone and Install
```bash
git clone <repository-url>
cd wx-lexp
npm install
```

### 2. Environment Setup
Create a `.env` file in the root directory:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### 3. Database Setup
Run the production migration in your Supabase SQL Editor:
```sql
-- Copy and paste the contents of supabase/migrations/20250127200000_final_production_setup.sql
```

### 4. Start Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 📁 Project Structure

```
src/
├── api/                    # API functions for different platforms
│   ├── searchProfiles.ts
│   ├── searchInstagramProfiles.ts
│   ├── searchFacebookProfiles.ts
│   └── searchTwitterProfiles.ts
├── components/             # Reusable UI components
│   ├── SearchFilters.tsx
│   ├── ProfileList.tsx
│   ├── Navbar.tsx
│   └── ...
├── hooks/                  # Custom React hooks
│   └── useSearchLimit.ts
├── lib/                    # External service configurations
│   └── supabase.ts
├── pages/                  # Application pages
│   ├── Dashboard.tsx
│   ├── Login.tsx
│   ├── Signup.tsx
│   └── ...
├── utils/                  # Utility functions
│   ├── searchLimits.ts
│   └── exportToExcel.ts
└── types.ts               # TypeScript type definitions
```

## 🔧 Configuration

### Supabase Setup
1. Create a new Supabase project
2. Run the production migration SQL
3. Configure authentication settings
4. Set up Row Level Security policies

### Google Custom Search
1. Get a Google Custom Search API key
2. Create a custom search engine
3. Update the API key in `src/api/searchProfiles.ts`

## 📊 Database Schema

### Tables
- **subscriptions**: User subscription plans and status
- **user_searches**: Daily search usage tracking

### Key Functions
- `increment_search_count(user_uuid)`: Increment daily search count
- `get_daily_search_count(user_uuid)`: Get current daily search count
- `can_user_search(user_uuid)`: Check if user can perform more searches

## 🔒 Security

- **Row Level Security**: All tables have RLS enabled
- **User Isolation**: Users can only access their own data
- **Authentication**: Secure JWT-based authentication
- **API Protection**: Service role key for admin operations only

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Netlify
1. Connect repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Configure environment variables

### Manual Deployment
1. Build the project: `npm run build`
2. Upload `dist` folder to your hosting provider
3. Configure environment variables

## 📝 API Reference

### Search Profiles
```typescript
searchProfiles(filters: SearchFiltersState, userId?: string): Promise<SearchResponse>
```

### Search Limits
```typescript
checkSearchLimit(userId: string): Promise<SearchLimitInfo>
incrementSearchCount(userId: string): Promise<boolean>
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Email: admin@webxela.com
- Create an issue in the repository

## 🔄 Changelog

### v1.0.0 (Current)
- Initial release
- Multi-platform profile search
- User authentication and subscription management
- Search limit enforcement
- Export functionality
- Responsive design

---

**Note**: This application is for development and testing purposes. Please ensure you have proper permissions and comply with platform terms of service when using profile search features.