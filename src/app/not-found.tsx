'use client';

import Link from 'next/link';
import { Home } from 'lucide-react';

export default function PageNotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6 py-12">
      <div className="text-center">
        <h1 className="text-[8rem] font-bold text-[#00CCCC] mb-4">404</h1>
        <p className="text-gray-600 text-lg mb-8">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. <br />
          The page might have been moved, deleted, or the URL might be incorrect.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-[#00CCCC] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#009999] transition-colors"
        >
          <Home size={20} />
          Go to Home
        </Link>
      </div>
    </div>
  );
}
