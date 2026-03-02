import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gray-50">
      <h1 className="text-4xl font-medium text-gray-900 mb-2">Project not found</h1>
      <p className="text-gray-600 mb-8">The project you’re looking for doesn’t exist or was removed.</p>
      <Link
        href="/projects"
        className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-2"
      >
        See all projects
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </Link>
    </div>
  )
}
