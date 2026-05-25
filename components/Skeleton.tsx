export default function Skeleton() {
  return (
    <>
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 flex flex-col gap-4 animate-pulse"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-zinc-800" />
            <div className="h-4 bg-zinc-800 rounded w-3/4" />
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="h-3 bg-zinc-800 rounded w-1/4" />
            <div className="h-1.5 bg-zinc-800 rounded-full w-full" />
          </div>
        </div>
      ))}
    </>
  );
}