export default function RootLoading() {
  return (
    <div className="app-backdrop min-h-screen px-6 py-8 sm:px-10 lg:px-14">
      <div className="panel mx-auto max-w-[1380px] overflow-hidden rounded-[36px] px-6 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12">
        <div className="loading-shimmer h-5 w-44 rounded-full" />
        <div className="mt-6 loading-shimmer h-16 max-w-3xl rounded-[28px]" />
        <div className="mt-4 loading-shimmer h-6 max-w-2xl rounded-full" />
        <div className="mt-8 flex gap-4">
          <div className="loading-shimmer h-12 w-40 rounded-2xl" />
          <div className="loading-shimmer h-12 w-40 rounded-2xl" />
        </div>
      </div>
    </div>
  );
}
