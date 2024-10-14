import { Metadata } from 'next';
import * as React from 'react';
import { RiAlarmWarningFill } from 'react-icons/ri';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Not Found',
  description: 'The page you are looking for does not exist. Return to the homepage.',
};

export default function NotFound() {
  return (
    <main>
      <section className="bg-white">
        <div className="layout flex min-h-screen flex-col items-center justify-center text-center text-black">
          <RiAlarmWarningFill size={60} className="drop-shadow-glow animate-flicker text-red-500" />
          <h1 className="mt-8 text-4xl md:text-6xl">Page Not Found</h1>
          <p className="mt-4 text-lg">Sorry, the page you&#39;re looking for does not exist.</p>
          <Link href="/" className="mt-6 text-blue-500 underline hover:text-blue-700">
            Back to Home
          </Link>
        </div>
      </section>
    </main>
  );
}
