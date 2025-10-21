import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import './globals.css';
import { AudioProvider } from '@/context/audio-context';

export const metadata: Metadata = {
  title: 'Happy Diwali',
  description: 'A festive showcase of Diwali lights by the Revamp GSoC cohort.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="icon" href="https://ik.imagekit.io/cotszrkgk/Screenshot_2025-06-25_at_9.10.56_PM-removebg-preview.png?updatedAt=1756648034230" sizes="any" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&family=Outfit:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={cn('font-body antialiased')} suppressHydrationWarning>
        <AudioProvider>
          {children}
          <Toaster />
        </AudioProvider>
      </body>
    </html>
  );
}
