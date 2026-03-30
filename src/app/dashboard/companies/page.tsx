import Link from "next/link";
import {
  createCompanyAction,
  deleteCompanyAction,
} from "@/app/dashboard/companies/actions";
import { listCompanies } from "@/lib/data/companies";

function readParam(
  value: string | string[] | undefined,
  fallback = "",
): string {
  if (typeof value === "string") {
    return value;
  }

  if (Array.isArray(value)) {
    return value[0] || fallback;
  }

  return fallback;
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(new Date(value));
}

export default async function CompaniesPage(props: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const searchParams = await props.searchParams;
  const status = readParam(searchParams.status);
  const errorMessage = readParam(searchParams.error);
  const query = readParam(searchParams.query).trim().toLowerCase();
  const viewParam = readParam(searchParams.view, "add");
  const activeView = viewParam === "list" ? "list" : "add";
  const { companies, error } = await listCompanies();

  const filteredCompanies = companies.filter((company) => {
    if (!query) {
      return true;
    }

    return [company.name, company.contact_info || ""]
      .join(" ")
      .toLowerCase()
      .includes(query);
  });

  const successMessage =
    status === "created"
      ? "Company added successfully."
      : status === "deleted"
        ? "Company deleted successfully."
        : "";

  const formCardClass =
    activeView === "add"
      ? "ring-1 ring-[#d7c0a0] shadow-[0_24px_60px_-45px_rgba(200,138,61,0.65)]"
      : "";
  const listCardClass =
    activeView === "list"
      ? "ring-1 ring-slate-200 shadow-[0_24px_60px_-45px_rgba(15,23,42,0.35)]"
      : "";

  return (
    <div className="space-y-6">
      <header className="panel mesh-card rounded-[34px] p-6 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#8d5d24]">
              Companies
            </p>
            <h1 className="mt-3 font-display text-4xl text-[#182533]">
              Company Registry
            </h1>
            <p className="mt-3 text-sm leading-7 text-muted">
              Keep the company database clean so every customer document is
              attached to the correct organization from day one.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/dashboard/companies?view=add"
              className={
                activeView === "add" ? "primary-button" : "secondary-button"
              }
            >
              Add Company
            </Link>
            <Link
              href="/dashboard/companies?view=list"
              className={
                activeView === "list" ? "primary-button" : "secondary-button"
              }
            >
              Company List
            </Link>
          </div>
        </div>
      </header>

      {successMessage ? (
        <div className="rounded-[20px] border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
          {successMessage}
        </div>
      ) : null}

      {errorMessage || error ? (
        <div className="rounded-[20px] border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {errorMessage || error}
        </div>
      ) : null}

      <section className="grid gap-4 md:grid-cols-3">
        <article className="panel rounded-[28px] p-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-muted">
            Total Companies
          </p>
          <p className="mt-4 text-4xl font-bold text-[#182533]">
            {companies.length}
          </p>
          <p className="mt-4 text-sm leading-6 text-muted">
            Active organizations available for customer assignment.
          </p>
        </article>
        <article className="panel rounded-[28px] p-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-muted">
            Filtered Result
          </p>
          <p className="mt-4 text-4xl font-bold text-[#182533]">
            {filteredCompanies.length}
          </p>
          <p className="mt-4 text-sm leading-6 text-muted">
            Matches based on company name or contact information.
          </p>
        </article>
        <article className="panel rounded-[28px] p-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-muted">
            Recommended Use
          </p>
          <p className="mt-4 text-lg font-semibold text-[#182533]">
            Add once, reuse everywhere
          </p>
          <p className="mt-4 text-sm leading-6 text-muted">
            Build the company base first, then customer entry becomes faster and
            more consistent.
          </p>
        </article>
      </section>

      <section className="grid gap-6 xl:grid-cols-[380px_1fr]">
        <article className={`panel rounded-[30px] p-6 ${formCardClass}`}>
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-muted">
                Admin Action
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-[#19303d]">
                Add Company
              </h2>
            </div>
            <span className="status-pill bg-[#fff4de] text-[#8d5d24]">
              Step 1
            </span>
          </div>

          <p className="mt-3 text-sm leading-6 text-muted">
            Add partner companies once, then use them in every customer record
            and printed document.
          </p>

          <form action={createCompanyAction} className="mt-6 space-y-4">
            <div>
              <label htmlFor="name" className="field-label">
                Company Name
              </label>
              <input
                id="name"
                name="name"
                required
                className="field-input"
                placeholder="Skyline Tours LLC"
              />
            </div>

            <div>
              <label htmlFor="contactInfo" className="field-label">
                Contact Info
              </label>
              <input
                id="contactInfo"
                name="contactInfo"
                className="field-input"
                placeholder="+1 555 123 4567"
              />
            </div>

            <button type="submit" className="primary-button w-full">
              Save Company
            </button>
          </form>
        </article>

        <article className={`panel rounded-[30px] p-6 ${listCardClass}`}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-muted">
                Company Directory
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-[#19303d]">
                Company List
              </h2>
            </div>

            <form
              action="/dashboard/companies"
              className="flex w-full flex-wrap items-center gap-3 sm:w-auto"
            >
              <input type="hidden" name="view" value="list" />
              <input
                type="search"
                name="query"
                defaultValue={query}
                placeholder="Search company"
                className="field-input min-w-[240px] sm:w-[280px]"
              />
              <button type="submit" className="secondary-button">
                Filter
              </button>
            </form>
          </div>

          {filteredCompanies.length === 0 ? (
            <div className="mt-6 rounded-[24px] border border-dashed border-slate-300 bg-slate-50 px-6 py-8 text-sm text-muted">
              {query
                ? "No companies matched your search."
                : "No companies yet. Add your first company from the form."}
            </div>
          ) : (
            <div className="mt-6 overflow-hidden rounded-[24px] border border-slate-200">
              <div className="overflow-x-auto">
                <table className="data-table bg-white">
                  <thead className="surface-muted text-left">
                    <tr>
                      <th>Name</th>
                      <th>Contact</th>
                      <th>Created</th>
                      <th className="text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCompanies.map((company) => (
                      <tr key={company.id}>
                        <td>
                          <p className="text-sm font-semibold text-[#19303d]">
                            {company.name}
                          </p>
                        </td>
                        <td className="text-sm text-muted">
                          {company.contact_info || "No contact info"}
                        </td>
                        <td className="text-sm text-muted">
                          {formatDate(company.created_at)}
                        </td>
                        <td className="text-right">
                          <form action={deleteCompanyAction} className="inline-flex">
                            <input
                              type="hidden"
                              name="companyId"
                              value={company.id}
                            />
                            <button type="submit" className="danger-button">
                              Delete
                            </button>
                          </form>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </article>
      </section>
    </div>
  );
}
