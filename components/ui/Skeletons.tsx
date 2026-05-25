function SkeletonBox({ className = "" }: { className?: string }) {
  return (
    <div
      className={`shimmer rounded-lg ${className}`}
      style={{ background: "var(--bg-elevated)" }}
    />
  );
}

function SkeletonTile({ className = "" }: { className?: string }) {
  return (
    <div
      className={`rounded-2xl p-5 flex flex-col gap-4 ${className}`}
      style={{
        background: "var(--bg-surface)",
        border: "1px solid var(--border-subtle)",
      }}
    >
      <SkeletonBox className="w-10 h-10" />
      <div className="space-y-2 flex-1">
        <SkeletonBox className="w-3/4 h-3" />
        <SkeletonBox className="w-1/2 h-3" />
      </div>
      <div className="space-y-1.5">
        <div className="flex justify-between">
          <SkeletonBox className="w-12 h-2" />
          <SkeletonBox className="w-8 h-2" />
        </div>
        <SkeletonBox className="w-full h-1.5" />
      </div>
    </div>
  );
}

export function CoursesSkeleton() {
  return (
    <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {/* Hero skeleton */}
      <div
        className="col-span-1 md:col-span-2 rounded-2xl p-6 h-48 flex flex-col justify-between"
        style={{
          background: "var(--bg-surface)",
          border: "1px solid var(--border-subtle)",
        }}
      >
        <div className="space-y-2">
          <SkeletonBox className="w-24 h-2" />
          <SkeletonBox className="w-56 h-5" />
        </div>
        <div className="space-y-3">
          <SkeletonBox className="w-48 h-2" />
          <div className="flex gap-1">
            {Array.from({ length: 7 }).map((_, i) => (
              <SkeletonBox key={i} className="w-6 h-6" />
            ))}
          </div>
        </div>
      </div>

      {/* Activity skeleton */}
      <div
        className="col-span-1 md:col-span-2 rounded-2xl p-5"
        style={{
          background: "var(--bg-surface)",
          border: "1px solid var(--border-subtle)",
        }}
      >
        <SkeletonBox className="w-32 h-3 mb-4" />
        <div className="flex gap-1">
          {Array.from({ length: 16 }).map((_, wi) => (
            <div key={wi} className="flex flex-col gap-[3px]">
              {Array.from({ length: 7 }).map((_, di) => (
                <SkeletonBox key={di} className="w-[10px] h-[10px] rounded-[2px]" />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Stats tiles */}
      <div
        className="rounded-2xl p-5 h-32 flex flex-col justify-between"
        style={{
          background: "var(--bg-surface)",
          border: "1px solid var(--border-subtle)",
        }}
      >
        <SkeletonBox className="w-9 h-9" />
        <div className="space-y-1">
          <SkeletonBox className="w-16 h-5" />
          <SkeletonBox className="w-10 h-2" />
        </div>
      </div>

      <div
        className="rounded-2xl p-5 h-32 flex flex-col justify-between"
        style={{
          background: "var(--bg-surface)",
          border: "1px solid var(--border-subtle)",
        }}
      >
        <SkeletonBox className="w-9 h-9" />
        <div className="space-y-1">
          <SkeletonBox className="w-16 h-5" />
          <SkeletonBox className="w-10 h-2" />
        </div>
      </div>

      {/* Course skeletons */}
      {Array.from({ length: 4 }).map((_, i) => (
        <SkeletonTile key={i} className="h-44" />
      ))}
    </div>
  );
}
