import Link from "next/link";
import { AddCompanyForm } from "@/components/add-company-form";

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

export default async function AddCompanyPage(props: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const searchParams = await props.searchParams;
  const status = readParam(searchParams.status);
  const errorMessage = readParam(searchParams.error);

  const successMessage =
    status === "created"
      ? "Company added successfully."
      : status === "deleted"
        ? "Company deleted successfully."
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
              Add Company
            </h1>
          <p className="mt-3 text-sm leading-7 text-muted">
              Register a new partner company with its Arabic name for customer assignment and document generation.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/dashboard/companies/list"
              className="secondary-button"
            >
              View Companies
            </Link>
          </div>
        </div>
      </header>

      {successMessage ? (
        <div className="rounded-[20px] border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
          {successMessage}
        </div>
      ) : null}

      {errorMessage ? (
        <div className="rounded-[20px] border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {errorMessage}
        </div>
      ) : null}

      <section className="grid gap-6 lg:grid-cols-[480px_1fr]">
        <article className="panel rounded-[30px] p-6 ring-1 ring-[#d7c0a0] shadow-[0_24px_60px_-45px_rgba(200,138,61,0.65)]">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-muted">
                Admin Action
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-[#19303d]">
                New Company
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

          <AddCompanyForm returnTo="/dashboard/companies/list" />
        </article>

        {/* Quick Tips */}
        <article className="panel rounded-[30px] p-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-muted">
            Quick Tips
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-[#19303d]">
            Company Best Practices
          </h2>
          
          <div className="mt-6 space-y-4">
            {[
              {
                title: "Add Once, Use Forever",
                description: "Create companies upfront, then quickly assign customers during entry.",
                icon: "✓",
              },
              {
                title: "Use Arabic Name",
                description: "Keep the official Arabic company name consistent everywhere it appears.",
                icon: "ع",
              },
              {
                title: "Clean Records",
                description: "Regularly review and remove unused companies to keep data tidy.",
                icon: "🧹",
              },
            ].map((tip) => (
              <div
                key={tip.title}
                className="flex items-start gap-4 rounded-[20px] border border-slate-200 bg-slate-50/60 p-4"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 text-lg font-bold">
                  {tip.icon}
                </span>
                <div>
                  <p className="text-sm font-semibold text-[#19303d]">{tip.title}</p>
                  <p className="mt-1 text-xs text-muted">{tip.description}</p>
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}
