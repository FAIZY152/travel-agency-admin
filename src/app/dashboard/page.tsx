import Link from "next/link";
import { LogoutButton } from "@/components/logout-button";
import { getDashboardStats } from "@/lib/data/dashboard";
import { getCustomerDocumentHref } from "@/lib/document-view-route";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(new Date(value));
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-slate-400">
      {children}
    </p>
  );
}

export default async function DashboardPage() {
  const stats = await getDashboardStats();

  const setupState =
    stats.companiesCount === 0
      ? {
          label: "Create your first company",
          description:
            "Start by adding at least one company so customer records have a valid parent organization.",
          href: "/dashboard/companies/add",
          action: "Add Company",
        }
      : stats.customersCount === 0
        ? {
            label: "Create your first customer",
            description:
              "Your company registry is ready. Add the first customer record to unlock the document and QR flow.",
            href: "/dashboard/customers/add",
            action: "Add Customer",
          }
        : {
            label: "Operations are active",
            description:
              "Your admin workspace is live. You can manage records, open document views, print, and verify publicly.",
            href: "/dashboard/customers/list",
            action: "Open Customers",
          };

  return (
    <div className="space-y-5">
      {/* Header */}
      <header
        className="relative overflow-hidden rounded-[32px] px-7 py-7"
        style={{
          background: "linear-gradient(118deg, #f0fdf8 0%, #f8faff 55%, #fffbf0 100%)",
          border: "1px solid #d1fae5",
        }}
      >
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%)",
          }}
        />

        <div className="relative flex flex-wrap items-start justify-between gap-5">
          <div className="max-w-2xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-emerald-600">
              Admin Dashboard
            </p>
            <h1
              className="mt-2.5 text-4xl font-bold text-[#0f1f2d] sm:text-5xl"
              style={{
                fontFamily: "Georgia, 'Times New Roman', serif",
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
              }}
            >
              Travel Agency
              <br />
              Control Center
            </h1>
            <p className="mt-3 text-sm leading-7 text-slate-500 sm:text-base">
              Manage companies, create customers, open print-ready documents,
              and publish trusted QR verification pages — all in one place.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              href="/dashboard/customers/add"
              className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{
                background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                boxShadow: "0 4px 14px rgba(16,185,129,0.35)",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              Add Customer
            </Link>
            <Link
              href="/dashboard/companies/add"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
            >
              Add Company
            </Link>
            <LogoutButton />
          </div>
        </div>
      </header>

      {/* Warning banner */}
      {stats.warning ? (
        <p className="rounded-[18px] border border-amber-200 bg-amber-50 px-5 py-3 text-sm font-medium text-amber-800">
          {stats.warning}
        </p>
      ) : null}

      {/* Quick Access - Clean & Professional */}
      <section className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        {/* Recommended Next Step */}
        <article className="rounded-[28px] border border-slate-200/80 bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <SectionLabel>Recommended Next Step</SectionLabel>
              <h2 className="mt-3 text-2xl font-bold text-[#0f1f2d]" style={{ letterSpacing: "-0.02em" }}>
                {setupState.label}
              </h2>
            </div>
            <Link
              href={setupState.href}
              className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{
                background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                boxShadow: "0 4px 14px rgba(16,185,129,0.3)",
              }}
            >
              {setupState.action}
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M3 6.5h7M7 3.5l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500">
            {setupState.description}
          </p>

          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {[
              {
                step: "01",
                title: "Company Setup",
                description:
                  "Register partner companies once so all new customer records can be linked correctly.",
                accent: "#f0fdf9",
                border: "#d1fae5",
                stepColor: "#059669",
              },
              {
                step: "02",
                title: "Customer Entry",
                description:
                  "Add a customer with identity details, certificate details, and image upload.",
                accent: "#eff6ff",
                border: "#bfdbfe",
                stepColor: "#2563eb",
              },
              {
                step: "03",
                title: "Document View",
                description:
                  "Open the generated customer document to review the printable layout and QR code.",
                accent: "#fffbeb",
                border: "#fde68a",
                stepColor: "#d97706",
              },
              {
                step: "04",
                title: "Public Verify",
                description:
                  "Anyone scanning the QR lands on the public verification page outside the admin wall.",
                accent: "#faf5ff",
                border: "#e9d5ff",
                stepColor: "#7c3aed",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-[20px] p-4"
                style={{
                  background: item.accent,
                  border: `1px solid ${item.border}`,
                }}
              >
                <p
                  className="mb-2 font-bold"
                  style={{ fontSize: 11, color: item.stepColor, letterSpacing: "0.06em" }}
                >
                  {item.step}
                </p>
                <p className="text-sm font-semibold text-[#1d3146]">{item.title}</p>
                <p className="mt-2 text-xs leading-5 text-slate-500">{item.description}</p>
              </div>
            ))}
          </div>
        </article>

        {/* Quick Access Links */}
        <article className="rounded-[28px] border border-slate-200/80 bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
          <SectionLabel>Quick Access</SectionLabel>

          <div className="mt-4 flex flex-col gap-2.5">
            {[
              {
                href: "/dashboard/companies/list",
                title: "Company List",
                note: "Review active partner organizations and clean unused records.",
                dot: "#10b981",
                dotGlow: "rgba(16,185,129,0.18)",
              },
              {
                href: "/dashboard/customers/list",
                title: "All Customers",
                note: "Find records quickly and jump into edit, document, or delete actions.",
                dot: "#3b82f6",
                dotGlow: "rgba(59,130,246,0.18)",
              },
              {
                href: "/dashboard/customers/add",
                title: "New Customer",
                note: "Use the guided form to create a document-ready customer profile.",
                dot: "#f59e0b",
                dotGlow: "rgba(245,158,11,0.18)",
              },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-center gap-3.5 rounded-[18px] border border-slate-200 bg-slate-50/60 px-4 py-4 transition hover:border-slate-300 hover:bg-white"
              >
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                  style={{ background: item.dotGlow }}
                >
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ background: item.dot }}
                  />
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold text-[#19303d]">
                    {item.title}
                  </span>
                  <span className="mt-0.5 block text-xs leading-5 text-slate-400">
                    {item.note}
                  </span>
                </span>

                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  className="shrink-0 text-slate-300 transition-transform group-hover:translate-x-0.5 group-hover:text-slate-400"
                >
                  <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            ))}
          </div>
        </article>
      </section>

      {/* Recent Records */}
      <section className="grid gap-4 xl:grid-cols-2">
        {/* Recent Companies */}
        <article className="rounded-[28px] border border-slate-200/80 bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
          <div className="flex items-center justify-between gap-3">
            <div>
              <SectionLabel>Recent Companies</SectionLabel>
              <h2 className="mt-2.5 text-xl font-bold text-[#182533]" style={{ letterSpacing: "-0.02em" }}>
                Latest partner records
              </h2>
            </div>
            <Link
              href="/dashboard/companies/list"
              className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-600 transition hover:bg-white hover:border-slate-300"
            >
              View All →
            </Link>
          </div>

          {stats.recentCompanies.length === 0 ? (
            <div className="mt-5 rounded-[20px] border border-dashed border-slate-200 bg-slate-50 px-5 py-6 text-sm text-slate-400">
              No company records yet.
            </div>
          ) : (
            <div className="mt-4 space-y-2">
              {stats.recentCompanies.map((company, i) => {
                const palettes = [
                  { bg: "#f0fdf9", text: "#059669", border: "#d1fae5" },
                  { bg: "#eff6ff", text: "#2563eb", border: "#bfdbfe" },
                  { bg: "#fffbeb", text: "#d97706", border: "#fde68a" },
                ];
                const pal = palettes[i % palettes.length];
                return (
                  <div
                    key={company.id}
                    className="flex items-center justify-between gap-4 rounded-[18px] border border-slate-200/80 bg-slate-50/60 px-4 py-3.5"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-xs font-bold"
                        style={{ background: pal.bg, color: pal.text, border: `1px solid ${pal.border}` }}
                      >
                        {company.name.charAt(0)}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-[#19303d]">{company.name}</p>
                        <p className="text-xs text-slate-400">
                          Created {formatDate(company.createdAt)}
                        </p>
                      </div>
                    </div>
                    <Link
                      href="/dashboard/companies/list"
                      className="text-xs font-semibold text-amber-700 transition hover:text-amber-800"
                    >
                      Open →
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </article>

        {/* Recent Customers */}
        <article className="rounded-[28px] border border-slate-200/80 bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
          <div className="flex items-center justify-between gap-3">
            <div>
              <SectionLabel>Recent Customers</SectionLabel>
              <h2 className="mt-2.5 text-xl font-bold text-[#182533]" style={{ letterSpacing: "-0.02em" }}>
                Latest customer entries
              </h2>
            </div>
            <Link
              href="/dashboard/customers/list"
              className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-600 transition hover:bg-white hover:border-slate-300"
            >
              View All →
            </Link>
          </div>

          {stats.recentCustomers.length === 0 ? (
            <div className="mt-5 rounded-[20px] border border-dashed border-slate-200 bg-slate-50 px-5 py-6 text-sm text-slate-400">
              No customer records yet.
            </div>
          ) : (
            <div className="mt-4 space-y-2">
              {stats.recentCustomers.map((customer, i) => {
                const palettes = [
                  { bg: "#f0fdf9", text: "#059669", border: "#d1fae5" },
                  { bg: "#eff6ff", text: "#2563eb", border: "#bfdbfe" },
                  { bg: "#fffbeb", text: "#d97706", border: "#fde68a" },
                  { bg: "#fdf4ff", text: "#7c3aed", border: "#e9d5ff" },
                ];
                const pal = palettes[i % palettes.length];
                const initials = (customer.name || "?")
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase();
                return (
                  <div
                    key={customer.id}
                    className="flex flex-wrap items-center justify-between gap-3 rounded-[18px] border border-slate-200/80 bg-slate-50/60 px-4 py-3.5"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                        style={{ background: pal.bg, color: pal.text, border: `1px solid ${pal.border}` }}
                      >
                        {initials}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-[#19303d]">{customer.name}</p>
                        <p className="text-xs text-slate-400">
                          Created {formatDate(customer.createdAt)}
                        </p>
                      </div>
                    </div>
                    <Link
                      href={getCustomerDocumentHref(customer.id)}
                      className="text-xs font-semibold text-amber-700 transition hover:text-amber-800"
                    >
                      View →
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </article>
      </section>
    </div>
  );
}
