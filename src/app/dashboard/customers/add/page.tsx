import Link from "next/link";
import { listCompanies } from "@/lib/data/companies";
import { AddCustomerForm } from "@/components/add-customer-form";

function readParam(value: string | string[] | undefined, fallback = ""): string {
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return value[0] || fallback;
  return fallback;
}

export default async function AddCustomerPage(props: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const searchParams = await props.searchParams;
  const status = readParam(searchParams.status);
  const errorMessage = readParam(searchParams.error);
  const { companies, error: companiesError } = await listCompanies();

  const successMessage = status === "created" ? "Customer added successfully." : "";

  return (
    <div className="space-y-6">
      <header className="panel mesh-card rounded-[34px] p-6 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#8d5d24]">
              Customers
            </p>
            <h1 className="mt-3 font-display text-4xl text-[#182533]">Add New Customer</h1>
            <p className="mt-3 text-sm leading-7 text-muted">
              Fill in the health certificate details to create a new customer record.
            </p>
          </div>
          <Link href="/dashboard/customers/list" className="secondary-button self-start">
            View All Customers
          </Link>
        </div>
      </header>

      {successMessage ? (
        <div className="rounded-[20px] border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
          {successMessage}
        </div>
      ) : null}

      {errorMessage || companiesError ? (
        <div className="rounded-[20px] border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {errorMessage || companiesError}
        </div>
      ) : null}

      {companies.length === 0 ? (
        <div className="rounded-[20px] border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-800">
          Company is optional. You can still save the customer now, or{" "}
          <Link href="/dashboard/companies/add" className="ml-2 underline">
            add a company later
          </Link>
          .
        </div>
      ) : null}

      <article className="panel rounded-[30px] p-6 ring-1 ring-[#d7c0a0] shadow-[0_24px_60px_-45px_rgba(200,138,61,0.65)]">
        <AddCustomerForm companies={companies} returnTo="/dashboard/customers/list" />
      </article>
    </div>
  );
}
