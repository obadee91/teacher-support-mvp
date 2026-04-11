"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to an error reporting service in production
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      <div className="rounded-xl border border-red-200 bg-red-50 p-8 max-w-sm w-full">
        <h2 className="text-xl font-bold text-red-700 mb-2">
          Something went wrong
        </h2>
        <p className="text-sm text-red-600 mb-6">
          An unexpected error occurred. Please try again.
        </p>
        <button
          onClick={reset}
          className="w-full min-h-[48px] py-3 rounded-lg bg-accent text-white font-medium text-lg hover:bg-accent-hover active:scale-[0.98] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
