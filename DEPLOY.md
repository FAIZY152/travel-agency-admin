# Vercel Deployment Guide

## Quick Deploy

### 1. Install Vercel CLI
```bash
npm i -g vercel
```

### 2. Login to Vercel
```bash
vercel login


### 3. Deploy from project root
```bash
vercel --prod
```

---

## Environment Variables Setup

### Required Environment Variables

Add these in Vercel Dashboard → Project Settings → Environment Variables:

| Variable | Type | Description |
|----------|------|-------------|
| `ADMIN_EMAIL` | Plaintext | Admin login email |
| `ADMIN_PASSWORD` | Plaintext | Admin login password |
| `JWT_SECRET` | Plaintext | Secret key for JWT tokens (min 32 chars) |
| `SUPABASE_URL` | Plaintext | Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Secret | Supabase service role key |
| `NEXT_PUBLIC_SUPABASE_URL` | Plaintext | Same as SUPABASE_URL |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY` | Plaintext | Supabase anon key |
| `CLOUDINARY_CLOUD_NAME` | Plaintext | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Plaintext | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Secret | Cloudinary API secret |
| `CLOUDINARY_UPLOAD_FOLDER` | Plaintext | Upload folder path |
| `NEXT_PUBLIC_APP_URL` | Plaintext | Production URL |

### Production Environment Only
```
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
```

---

## Supabase Configuration for Vercel

### Step 1: Configure Connection Pooling (Recommended)

In Supabase Dashboard → Database → Connection Pooling:

1. Enable Connection Pooler (PgBouncer)
2. Copy the **Pooling** connection string (port 6543)
3. Use this format in Vercel:

```
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### Step 2: Database Schema

Ensure these tables exist in Supabase:

```sql
-- Companies table
CREATE TABLE companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Customers table
CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID REFERENCES companies(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  name_ar TEXT,
  passport TEXT,
  job_title TEXT,
  job_title_ar TEXT,
  image_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  municipal TEXT,
  honesty TEXT,
  id_number TEXT,
  nationality TEXT,
  sex TEXT,
  occupation TEXT,
  health_cert_number TEXT,
  health_cert_expiry TEXT,
  health_cert_issue_hijri TEXT,
  health_cert_issue_gregorian TEXT,
  edu_program_end TEXT,
  edu_program_end_gregorian TEXT,
  edu_program_type TEXT,
  facility_name TEXT,
  license_number TEXT,
  facility_number TEXT
);

-- Enable RLS
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;

-- Service role bypass policy
CREATE POLICY "service_role_all" ON companies FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "service_role_all" ON customers FOR ALL USING (true) WITH CHECK (true);
```

### Step 3: Row Level Security (RLS)

Since this app uses server-side auth with service role key:

```sql
-- Allow service role full access
CREATE POLICY "Enable all operations for service role" ON companies
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Enable all operations for service role" ON customers
  FOR ALL USING (auth.role() = 'service_role');
```

---

## GitHub Actions Auto-Deploy

### Setup GitHub Secrets

In your GitHub repository settings, add:

1. `VERCEL_TOKEN` - Get from https://vercel.com/account/tokens
2. `VERCEL_ORG_ID` - Get from `.vercel/project.json` after first deploy
3. `VERCEL_PROJECT_ID` - Get from `.vercel/project.json`

### Workflow already configured

The `.github/workflows/deploy.yml` is ready. Push to `main` branch triggers auto-deploy.

---

## Performance Optimizations Applied

### 1. Proxy Auth Protection (Next.js 16+)
- Routes protected at edge level via `src/proxy.ts` (Next.js 16 middleware pattern)
- Faster than page-level auth checks
- Automatic redirects to login

### 2. Next.js Config Optimizations
- Image optimization with AVIF/WebP
- Package import optimization (jose, zod)
- Security headers
- API route no-cache headers

### 3. Data Fetching
- `unstable_cache` for dashboard stats (30s revalidate)
- `unstable_noStore` for dynamic data
- Parallel queries with `Promise.all`

### 4. Loading States
- Route-level `loading.tsx` for instant feedback
- Shimmer animations for perceived performance

---

## Troubleshooting

### Build Errors

**Error: JWT_SECRET not defined**
```
Solution: Add JWT_SECRET env variable in Vercel dashboard
```

**Error: Supabase connection failed**
```
Solution: Check SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY
Verify IP allowlist in Supabase (allow 0.0.0.0/0 for serverless)
```

**Error: Image optimization failed**
```
Solution: Add res.cloudinary.com to next.config.js remotePatterns
```

### Runtime Errors

**401 on API routes**
- Check proxy.ts is properly deployed
- Verify JWT_SECRET matches between local and production

**Slow dashboard loading**
- Check Supabase connection pooling
- Verify dashboard uses unstable_cache

---

## Domain Configuration

### Custom Domain

1. Vercel Dashboard → Domains
2. Add your domain
3. Update DNS records as instructed
4. Update `NEXT_PUBLIC_APP_URL` env variable

### SSL/HTTPS
- Automatically handled by Vercel
- HSTS headers configured in next.config.ts

---

## Monitoring

### Vercel Analytics
Enable in Dashboard → Analytics for:
- Core Web Vitals
- Real user metrics
- Performance insights

### Log Drain (Optional)
```bash
vercel log drain add <drain-url>
```

---

## Security Checklist

- [ ] JWT_SECRET is 32+ characters, random
- [ ] Admin password is strong
- [ ] SUPABASE_SERVICE_ROLE_KEY is kept secret
- [ ] CLOUDINARY_API_SECRET is kept secret
- [ ] RLS policies are configured
- [ ] HTTPS enforced (HSTS headers)
- [ ] CSP headers added if needed

---

## Local Development

```bash
# Copy env template
cp .env.example .env.local

# Fill in values

# Install and run
npm install
npm run dev
```

---

## Support

- Vercel Docs: https://vercel.com/docs
- Next.js on Vercel: https://nextjs.org/docs/deployment
- Supabase Docs: https://supabase.com/docs
