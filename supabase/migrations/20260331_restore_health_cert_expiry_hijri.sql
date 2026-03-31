alter table public.customers
add column if not exists health_cert_expiry_hijri text;
