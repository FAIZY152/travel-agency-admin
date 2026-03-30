export default function DashboardLoading() {
  return (
    <div className="space-y-6">
      <div className="panel rounded-[32px] px-6 py-6 sm:px-8">
        <div className="loading-shimmer h-4 w-28 rounded-full" />
        <div className="mt-4 loading-shimmer h-14 w-72 rounded-[24px]" />
        <div className="mt-4 loading-shimmer h-5 max-w-xl rounded-full" />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="panel rounded-[28px] p-6">
            <div className="loading-shimmer h-4 w-32 rounded-full" />
            <div className="mt-5 loading-shimmer h-16 w-24 rounded-[24px]" />
            <div className="mt-5 loading-shimmer h-5 w-full rounded-full" />
          </div>
          <div className="panel rounded-[28px] p-6">
            <div className="loading-shimmer h-4 w-32 rounded-full" />
            <div className="mt-5 loading-shimmer h-16 w-24 rounded-[24px]" />
            <div className="mt-5 loading-shimmer h-5 w-full rounded-full" />
          </div>
        </div>

        <div className="panel rounded-[28px] p-6">
          <div className="loading-shimmer h-4 w-28 rounded-full" />
          <div className="mt-4 loading-shimmer h-12 w-56 rounded-[20px]" />
          <div className="mt-4 space-y-3">
            <div className="loading-shimmer h-14 rounded-2xl" />
            <div className="loading-shimmer h-14 rounded-2xl" />
            <div className="loading-shimmer h-14 rounded-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
