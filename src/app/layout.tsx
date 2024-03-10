import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Header from './_component/Header';
import Footer from './_component/Footer';
import QueryProvider from '@/lib/QueryProvider';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import LocaleProvider from '@/lib/i18n/LocaleProvider';

const pretendard = localFont({ src: './font/PretendardVariable.ttf' });

export const metadata: Metadata = {
  title: 'Cinema',
  description: 'Millions of movies, TV shows and people to discover. Explore now.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={pretendard.className}>
        <LocaleProvider>
          <QueryProvider>
            {/* <ReactQueryDevtools initialIsOpen={false} /> */}
            <Header />
            {children}
            <Footer />
          </QueryProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
