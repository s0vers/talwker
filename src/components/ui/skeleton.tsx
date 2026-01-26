import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800",
        className
      )}
      {...props}
    />
  );
}

function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-4 rounded-2xl bg-white p-4 shadow-card", className)}>
      <Skeleton className="aspect-card w-full rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-10 w-28 rounded-full" />
      </div>
    </div>
  );
}

function SkeletonTripCard({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-4 rounded-2xl bg-white p-4 shadow-card", className)}>
      <Skeleton className="h-48 w-full rounded-xl" />
      <div className="space-y-3">
        <div className="flex gap-2">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
        <Skeleton className="h-6 w-4/5" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
      <div className="flex items-center justify-between pt-2">
        <div className="space-y-1">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-6 w-28" />
        </div>
        <Skeleton className="h-12 w-32 rounded-full" />
      </div>
    </div>
  );
}

function SkeletonHero({ className }: { className?: string }) {
  return (
    <div className={cn("relative h-[80vh] w-full", className)}>
      <Skeleton className="h-full w-full rounded-none" />
      <div className="absolute inset-0 flex flex-col items-center justify-center space-y-6 px-4">
        <Skeleton className="h-16 w-96 max-w-full" />
        <Skeleton className="h-6 w-64 max-w-full" />
        <Skeleton className="h-20 w-full max-w-3xl rounded-2xl" />
      </div>
    </div>
  );
}

function SkeletonText({ lines = 3, className }: { lines?: number; className?: string }) {
  return (
    <div className={cn("space-y-2", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn("h-4", i === lines - 1 ? "w-2/3" : "w-full")}
        />
      ))}
    </div>
  );
}

export { Skeleton, SkeletonCard, SkeletonTripCard, SkeletonHero, SkeletonText };
