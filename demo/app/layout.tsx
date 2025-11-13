import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Particle Zen Garden | Neo-Tokyo Night',
  description: 'Interactive particle canvas with cyberpunk aesthetics',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
