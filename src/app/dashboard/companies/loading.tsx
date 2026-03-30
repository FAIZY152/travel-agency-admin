export default function CompaniesLoading() {
  return (
    <div className="space-y-6">
      <div className="panel rounded-[34px] p-6 sm:p-8">
        <div className="loading-shimmer h-4 w-24 rounded-full" />
        <div className="mt-4 loading-shimmer h-12 w-72 rounded-[20px]" />
        <div className="mt-4 loading-shimmer h-5 max-w-2xl rounded-full" />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="panel rounded-[28px] p-6">
            <div className="loading-shimmer h-4 w-32 rounded-full" />
            <div className="mt-5 loading-shimmer h-14 w-24 rounded-[18px]" />
            <div className="mt-5 loading-shimmer h-5 w-full rounded-full" />
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[380px_1fr]">
        <div className="panel rounded-[30px] p-6">
          <div className="loading-shimmer h-4 w-24 rounded-full" />
          <div className="mt-4 loading-shimmer h-10 w-40 rounded-[18px]" />
          <div className="mt-6 space-y-3">
            <div className="loading-shimmer h-12 rounded-2xl" />
            <div className="loading-shimmer h-12 rounded-2xl" />
            <div className="loading-shimmer h-12 rounded-2xl" />
          </div>
        </div>
        <div className="panel rounded-[30px] p-6">
          <div className="loading-shimmer h-4 w-24 rounded-full" />
          <div className="mt-4 loading-shimmer h-10 w-44 rounded-[18px]" />
          <div className="mt-6 space-y-3">
            <div className="loading-shimmer h-14 rounded-2xl" />
            <div className="loading-shimmer h-14 rounded-2xl" />
            <div className="loading-shimmer h-14 rounded-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
