alter table public.customers
drop constraint if exists customers_expiry_after_issue;

alter table public.customers
drop column if exists health_cert_expiry_hijri,
drop column if exists health_cert_expiry_gregorian,
drop column if exists issue_date,
drop column if exists expiry_date;
