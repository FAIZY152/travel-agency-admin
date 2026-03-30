import Link from "next/link";

function buildUrl(base: string, params: Record<string, string>) {
  const q = new URLSearchParams(params);
  return `${base}?${q.toString()}`;
}

export function Pagination({
  page,
  total,
  pageSize,
  baseUrl,
  extraParams = {},
}: {
  page: number;
  total: number;
  pageSize: number;
  baseUrl: string;
  extraParams?: Record<string, string>;
}) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  if (totalPages <= 1) return null;

  const prev = page > 1 ? page - 1 : null;
  const next = page < totalPages ? page + 1 : null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    (p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1,
  );

  const rendered: React.ReactNode[] = [];
  let last = 0;
  for (const p of pages) {
    if (last && p - last > 1) {
      rendered.push(
        <span key={`ellipsis-${p}`} className="px-1 text-slate-400 select-none">
          …
        </span>,
      );
    }
    rendered.push(
      p === page ? (
        <span
          key={p}
          className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0f1f2d] text-sm font-semibold text-white"
        >
          {p}
        </span>
      ) : (
        <Link
          key={p}
          href={buildUrl(baseUrl, { ...extraParams, page: String(p) })}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-600 transition hover:border-slate-300 hover:bg-slate-50"
        >
          {p}
        </Link>
      ),
    );
    last = p;
  }

  return (
    <div className="mt-5 flex items-center justify-between gap-3">
      <p className="text-xs text-slate-400">
        Page {page} of {totalPages} · {total} total
      </p>
      <div className="flex items-center gap-1.5">
        {prev ? (
          <Link
            href={buildUrl(baseUrl, { ...extraParams, page: String(prev) })}
            className="flex h-9 items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
          >
            ← Prev
          </Link>
        ) : (
          <span className="flex h-9 items-center gap-1 rounded-xl border border-slate-100 bg-slate-50 px-3 text-sm text-slate-300 select-none">
            ← Prev
          </span>
        )}
        <div className="flex items-center gap-1">{rendered}</div>
        {next ? (
          <Link
            href={buildUrl(baseUrl, { ...extraParams, page: String(next) })}
            className="flex h-9 items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
          >
            Next →
          </Link>
        ) : (
          <span className="flex h-9 items-center gap-1 rounded-xl border border-slate-100 bg-slate-50 px-3 text-sm text-slate-300 select-none">
            Next →
          </span>
        )}
      </div>
    </div>
  );
}
