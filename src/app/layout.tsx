import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

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
      <body className={pretendard.className}>{children}</body>
    </html>
  );
}
