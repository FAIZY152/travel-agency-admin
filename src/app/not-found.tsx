import Link from "next/link";

export default function NotFound() {
  return (
    <div className="app-backdrop flex min-h-screen items-center justify-center px-6 py-10 sm:px-10">
      <div className="panel mesh-card w-full max-w-3xl rounded-[32px] p-8 sm:p-10">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#8d5d24]">
          Not Found
        </p>
        <h1 className="mt-3 font-display text-4xl text-[#182533]">
          This page does not exist
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">
          The route may be wrong, the record may have been deleted, or the requested document is no longer available.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-2xl bg-brand px-5 py-3 text-sm font-semibold text-white hover:bg-brand-strong"
          >
            Back to Landing
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center rounded-2xl border border-[#d9ccb7] bg-white px-5 py-3 text-sm font-semibold text-[#7a5527] hover:bg-[#fff8ee]"
          >
            Open Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
