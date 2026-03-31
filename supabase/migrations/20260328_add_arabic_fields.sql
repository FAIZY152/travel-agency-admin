-- Add Arabic translation fields to companies table
-- No-op: company translation fields were removed from the schema.

-- Add Arabic translation fields to customers table  
alter table public.customers
add column if not exists name_ar text,
add column if not exists job_title_ar text;
