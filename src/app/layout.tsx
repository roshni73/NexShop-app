import './globals.css';
import type { Metadata } from 'next';
import { auth } from '@/lib/auth';
import SessionProvider from '@/lib/utils/SessionProvider';
import StoreProvider from '@/lib/utils/StoreProvider';
import Sidebar from '@/components/Layout/Sidebar';
import { ToastContainer } from 'react-toastify';

import { Poppins, Roboto } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-poppins',
});

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: 'NexShop',
  description: 'Mini E-Commerce Store',
};

export const dynamic = 'force-dynamic';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${roboto.variable} antialiased`}>
        <SessionProvider session={session}>
          <StoreProvider>
            <div className="flex h-screen bg-gray-50">
              <Sidebar />
              <main className="flex-1 lg:ml-0 h-screen overflow-auto">
                <div className="lg:hidden h-16"></div>
                {children}
              </main>
            </div>
            <ToastContainer />
          </StoreProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
