export default function DocumentLoading() {
  return (
    <div className="app-backdrop min-h-screen px-4 py-6 sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <div className="panel rounded-[32px] px-6 py-5">
          <div className="loading-shimmer h-4 w-28 rounded-full" />
          <div className="mt-4 loading-shimmer h-12 w-72 rounded-[22px]" />
        </div>
        <div className="panel mx-auto w-full max-w-[210mm] rounded-[32px] p-6 sm:p-10">
          <div className="loading-shimmer h-6 w-40 rounded-full" />
          <div className="mt-8 grid gap-8 lg:grid-cols-[240px_1fr]">
            <div className="space-y-4">
              <div className="loading-shimmer h-[320px] rounded-[28px]" />
              <div className="loading-shimmer h-[300px] rounded-[28px]" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="loading-shimmer h-32 rounded-[28px] sm:col-span-2" />
              <div className="loading-shimmer h-28 rounded-[28px]" />
              <div className="loading-shimmer h-28 rounded-[28px]" />
              <div className="loading-shimmer h-28 rounded-[28px]" />
              <div className="loading-shimmer h-28 rounded-[28px]" />
              <div className="loading-shimmer h-32 rounded-[28px] sm:col-span-2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
