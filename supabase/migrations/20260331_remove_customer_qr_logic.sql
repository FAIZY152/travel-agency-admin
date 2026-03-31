drop index if exists public.idx_customers_qr_token;

alter table public.customers
drop column if exists qr_token;
