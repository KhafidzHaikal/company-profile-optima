# Vercel Deployment Fix Guide

## Issues Fixed:

1. **File System Operations**: Modified API routes to use in-memory storage on Vercel instead of file system writes
2. **Environment Variables**: Added validation for Cloudinary credentials
3. **CORS Headers**: Already configured in vercel.json and next.config.ts

## Steps to Deploy Successfully:

### 1. Set Environment Variables in Vercel Dashboard

Go to your Vercel project dashboard → Settings → Environment Variables and add:

```
CLOUDINARY_CLOUD_NAME=dnj32ehjo
CLOUDINARY_API_KEY=228599883697345
CLOUDINARY_API_SECRET=3GmudYClv3--Z5um_7YKmcKd2Ac
```

### 2. Redeploy Your Application

After setting environment variables, trigger a new deployment:

```bash
# Push to trigger deployment
git add .
git commit -m "Fix Vercel deployment issues"
git push origin main
```

Or manually redeploy from Vercel dashboard.

### 3. Test Your APIs

After deployment, test these endpoints:

- `POST https://your-domain.vercel.app/api/news-images/` - Image upload
- `GET https://your-domain.vercel.app/api/news/` - Get news
- `POST https://your-domain.vercel.app/api/news/` - Create news

### 4. Important Notes:

- **Data Persistence**: On Vercel, news data is stored in memory and will reset on each deployment. For production, consider using:
  - Database (PostgreSQL, MongoDB)
  - External storage (AWS S3, Cloudinary for data)
  - Vercel KV storage

- **File Uploads**: Images are uploaded to Cloudinary, which works on Vercel

- **Local vs Production**: The code now automatically detects if running on Vercel and uses appropriate storage method

### 5. Recommended Production Setup:

For a production app, replace the in-memory storage with a database:

```typescript
// Example with Vercel Postgres
import { sql } from '@vercel/postgres';

// Instead of readNewsData()
const { rows } = await sql`SELECT * FROM news ORDER BY created_at DESC`;

// Instead of writeNewsData()
await sql`INSERT INTO news (title, content, excerpt, image) VALUES (${title}, ${content}, ${excerpt}, ${imageUrl})`;
```

## Testing Locally:

The app will continue to work locally using file system storage, while using in-memory storage on Vercel.