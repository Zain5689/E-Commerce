import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0b0f19] text-white p-6 text-center">
      <h1 className="text-6xl font-black text-brand-500 mb-2">404</h1>
      <h2 className="text-xl font-bold text-slate-200 mb-4">Page Not Found</h2>
      <p className="text-slate-400 text-sm max-w-md mb-6">
        The hardware component or page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="bg-brand-600 hover:bg-brand-500 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors"
      >
        Back to Kimo Store Home
      </Link>
    </div>
  );
}
