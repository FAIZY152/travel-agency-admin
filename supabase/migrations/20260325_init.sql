create extension if not exists "pgcrypto";

create table if not exists public.companies (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.customers (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references public.companies(id) on delete set null,
  name text not null,
  passport text not null,
  job_title text not null,
  image_url text not null,
  created_at timestamptz not null default now()
);

create index if not exists idx_companies_created_at on public.companies (created_at desc);
create index if not exists idx_customers_created_at on public.customers (created_at desc);
create index if not exists idx_customers_company_id on public.customers (company_id);
