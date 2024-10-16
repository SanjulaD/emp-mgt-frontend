import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import React from 'react';
import './globals.css';
import { Providers } from '../components/provider';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  title: 'Employee Manager',
  description: 'Manage your employee data effectively.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-100 text-gray-900`}>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <header className="bg-blue-400 shadow-md py-4 px-6 md:px-8" role="banner">
              <div className="max-w-7xl mx-auto">
                <h1 className="text-2xl md:text-3xl font-semibold">Employee Manager</h1>
              </div>
            </header>
            <main className="flex-grow">
              <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{children}</div>
            </main>
            <footer className="bg-blue-400 text-center py-4" role="contentinfo">
              <div className="max-w-7xl mx-auto px-4">
                <p className="text-sm text-white">
                  &copy; {new Date().getFullYear()} Employee Manager. All rights reserved.
                </p>
                <p className="text-sm text-white">
                  <a href="/privacy-policy" className="underline">
                    Privacy Policy
                  </a>{' '}
                  |
                  <a href="/terms-of-service" className="underline">
                    {' '}
                    Terms of Service
                  </a>
                </p>
              </div>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
