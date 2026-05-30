'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="bg-[#061024] border border-[#0c2a4a] rounded-2xl p-8 text-center">
        <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">⚠</span>
        </div>
        <h2 className="text-lg font-semibold text-white mb-2">Failed to load tokens</h2>
        <p className="text-sm text-[#5a8aaa] mb-4">{error.message || 'An unexpected error occurred.'}</p>
        <button
          onClick={reset}
          className="px-4 py-2 text-sm font-medium rounded-lg bg-[#0ea5e9] text-white hover:bg-[#0284c7] transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
