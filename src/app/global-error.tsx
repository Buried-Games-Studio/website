"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body className="bg-black text-white">
        <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-8 text-center">
          <h1 className="text-4xl font-bold">Something went wrong</h1>
          <p className="text-lg text-gray-400 max-w-md">
            An unexpected error occurred. Please try again.
          </p>
          <button
            onClick={reset}
            className="rounded-full bg-white px-6 py-3 font-bold text-black transition-colors hover:bg-gray-200"
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  );
}
