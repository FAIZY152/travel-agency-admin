"use client";

import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="app-backdrop flex min-h-screen items-center justify-center px-6 py-10 sm:px-10">
      <div className="panel mesh-card w-full max-w-3xl rounded-[32px] p-8 sm:p-10">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#8d5d24]">
          Application Error
        </p>
        <h1 className="mt-3 font-display text-4xl text-[#182533]">
          Something went wrong
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">
          A recoverable error interrupted the current view. You can retry the route or return to the dashboard.
        </p>
        {error.message ? (
          <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error.message}
          </div>
        ) : null}
        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center justify-center rounded-2xl bg-brand px-5 py-3 text-sm font-semibold text-white hover:bg-brand-strong"
          >
            Try Again
          </button>
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center rounded-2xl border border-[#d9ccb7] bg-white px-5 py-3 text-sm font-semibold text-[#7a5527] hover:bg-[#fff8ee]"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
