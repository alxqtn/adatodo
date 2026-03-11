export default function Loading() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <main className="mx-auto max-w-2xl px-4 py-12">
        <div className="h-10 w-64 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse mb-8" />
        <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="space-y-2"
            >
              <div className="h-6 bg-zinc-100 dark:bg-zinc-800 rounded animate-pulse w-full" />
              <div className="h-4 bg-zinc-100 dark:bg-zinc-800 rounded animate-pulse w-3/4" />
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
