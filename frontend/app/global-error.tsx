'use client';

import React from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col items-center justify-center bg-[#0b0f19] text-white p-6">
        <h2 className="text-2xl font-bold text-rose-500 mb-2">Global Application Error</h2>
        <p className="text-slate-400 text-sm mb-6">{error.message || 'A global runtime error occurred.'}</p>
        <button
          onClick={() => reset()}
          className="bg-brand-600 hover:bg-brand-500 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors"
        >
          Reset Application
        </button>
      </body>
    </html>
  );
}
