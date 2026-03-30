-- Add Arabic translation fields to companies table
alter table public.companies 
add column if not exists name_ar text,
add column if not exists contact_info_ar text;

-- Add Arabic translation fields to customers table  
alter table public.customers
add column if not exists name_ar text,
add column if not exists job_title_ar text;
