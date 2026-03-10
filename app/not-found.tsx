import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">404</h1>
        <p className="text-zinc-600 dark:text-zinc-400 mb-6">Page not found.</p>
        <Link
          href="/"
          className="text-blue-600 dark:text-blue-400 underline hover:no-underline"
        >
          Back to home
        </Link>
      </div>
    </div>
  )
}
