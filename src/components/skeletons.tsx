import { BlogShell } from "@/components/BlogShell";

function SkeletonBlock({ className }: { className?: string }) {
  return <div className={`bg-paper animate-pulse ${className ?? ""}`} />;
}

export function BlogIndexSkeleton() {
  return (
    <BlogShell>
      <section className="mx-auto max-w-[1440px] px-6 md:px-10">
        <header className="grid grid-cols-12 gap-x-6 pt-12 pb-14 md:pt-16 md:pb-20">
          <div className="col-span-12 md:col-span-3 mb-6 md:mb-0">
            <SkeletonBlock className="h-3 w-24" />
          </div>
          <div className="col-span-12 md:col-span-9 space-y-4">
            <SkeletonBlock className="h-16 w-3/4" />
            <SkeletonBlock className="h-5 w-1/2" />
          </div>
        </header>

        <ol className="border-t border-rule">
          {[1, 2, 3].map((i) => (
            <li key={i} className="border-b border-rule">
              <div className="grid grid-cols-12 gap-x-6 py-8 md:py-10 items-baseline">
                <div className="col-span-12 md:col-span-3 mb-3 md:mb-0">
                  <SkeletonBlock className="h-3 w-32" />
                </div>
                <div className="col-span-12 md:col-span-9 space-y-3">
                  <SkeletonBlock className="h-8 w-3/4" />
                  <SkeletonBlock className="h-4 w-2/3" />
                  <SkeletonBlock className="h-3 w-16" />
                </div>
              </div>
            </li>
          ))}
        </ol>

        <div className="py-16">
          <SkeletonBlock className="h-3 w-24" />
        </div>
      </section>
    </BlogShell>
  );
}

export function BlogPostSkeleton() {
  return (
    <BlogShell>
      <article className="mx-auto max-w-[1440px] px-6 md:px-10">
        <header className="grid grid-cols-12 gap-x-6 pt-12 pb-14 md:pt-16 md:pb-20 border-b border-rule">
          <div className="col-span-12 md:col-span-3 mb-6 md:mb-0 space-y-3">
            <SkeletonBlock className="h-3 w-16" />
            <SkeletonBlock className="h-3 w-28" />
          </div>
          <div className="col-span-12 md:col-span-9 space-y-4">
            <SkeletonBlock className="h-14 w-5/6" />
            <SkeletonBlock className="h-5 w-2/3" />
          </div>
        </header>

        <div className="grid grid-cols-12 gap-x-6 py-16 md:py-20">
          <div className="hidden md:block col-span-3" aria-hidden="true" />
          <div className="col-span-12 md:col-span-8 space-y-3">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <SkeletonBlock key={i} className={`h-4 ${i % 3 === 0 ? "w-3/4" : "w-full"}`} />
            ))}
          </div>
        </div>

        <div className="border-t border-rule py-10">
          <SkeletonBlock className="h-3 w-24" />
        </div>
      </article>
    </BlogShell>
  );
}
