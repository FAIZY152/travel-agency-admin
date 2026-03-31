# Travel Agency Platform

Single-admin travel agency platform with this flow:

`Landing -> Login -> Dashboard -> Companies -> Customers -> Document`

## Current Status

- Milestone 1: Landing page, admin login, JWT cookie auth, protected routes.
- Milestone 2: Dashboard live counts + Companies CRUD with Supabase integration.
- Milestone 3: Customers CRUD with company linkage and Cloudinary image upload.
- Milestone 4: Document view and print support.

## Key Routes

- `/dashboard`
- `/dashboard/companies`
- `/dashboard/customers`
- `/document/[id]`

## Environment Setup

Create `.env.local` from `.env.example` and set:

```env
ADMIN_EMAIL=admin@gmail.com
ADMIN_PASSWORD=123456
JWT_SECRET=replace_with_a_strong_secret
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your_publishable_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLOUDINARY_UPLOAD_FOLDER=travel-agency/customers
```

## Database Setup (Supabase SQL Editor)

Run one of:

`supabase/schema.sql`

or

`supabase/migrations/20260325_init.sql`

This creates:

- `companies`
- `customers`

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Auth Smoke Tests

Start the app in another terminal, then run:

```bash
npm run smoke:auth
```

Optional custom base URL:

```bash
npm run smoke:auth -- http://localhost:3000
```

## Quality Checks

```bash
npm run lint
npm run build
```
