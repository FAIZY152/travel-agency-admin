import Link from "next/link";

export default function Home() {
  return (
    <div className="app-backdrop relative isolate min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-[radial-gradient(circle_at_center,_rgba(200,138,61,0.16),_transparent_70%)]" />

      <main className="mx-auto w-full max-w-[1420px] px-6 py-8 sm:px-10 lg:px-14">
        <section className="panel mesh-card overflow-hidden rounded-[40px]">
          <div className="grid gap-10 px-6 py-8 sm:px-8 sm:py-10 lg:grid-cols-[1.15fr_0.85fr] lg:px-12 lg:py-12">
            <div className="max-w-3xl">
              <p className="inline-flex rounded-full border border-[#d9ccb7] bg-[#f6efe3] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#8d5d24]">
                Travel Agency Admin Platform
              </p>

              <h1 className="mt-6 font-display text-5xl leading-[1.02] text-[#182533] sm:text-6xl">
                Landing, login, dashboard, document, and QR verify in one clean admin flow.
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-ink-soft sm:text-lg">
                This system is intentionally simple: one admin signs in, manages companies and customers, opens the generated document, prints it, and shares the QR-backed public verification page.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/login"
                  className="primary-button px-6 py-3.5"
                >
                  Admin Login
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                {[
                  "Landing Page",
                  "Login",
                  "Dashboard",
                  "Companies",
                  "Customers",
                  "Document View",
                  "Public Verify",
                ].map((item) => (
                  <span key={item} className="rounded-full bg-white/75 px-3 py-2">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid gap-4">
              <article className="rounded-[30px] border border-[#d7ccba] bg-[#10263b] p-6 text-white shadow-[0_24px_70px_-40px_rgba(22,49,60,0.8)]">
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/60">
                  Core Flow
                </p>
                <div className="mt-5 grid gap-3">
                  {[
                    "Landing page introduces the admin-only system",
                    "Login checks env credentials and stores JWT cookie",
                    "Dashboard leads into company and customer management",
                    "Document page prints and QR opens public verify",
                  ].map((item, index) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                    >
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-sm font-semibold">
                        0{index + 1}
                      </span>
                      <span className="text-sm text-white/80">{item}</span>
                    </div>
                  ))}
                </div>
              </article>

              <div className="grid gap-4 sm:grid-cols-2">
                <article className="panel-soft rounded-[24px] p-5">
                  <p className="text-sm font-semibold text-[#19303d]">Single Admin Auth</p>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    JWT cookie auth keeps `/dashboard`, `/companies`, `/customers`, and `/document/*` protected.
                  </p>
                </article>
                <article className="panel-soft rounded-[24px] p-5">
                  <p className="text-sm font-semibold text-[#19303d]">Operational Simplicity</p>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    No signup, no roles, no extra permission system. Just one admin workflow that stays fast.
                  </p>
                </article>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
