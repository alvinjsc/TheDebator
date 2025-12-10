// app/layout.tsx
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';
import Providers from './providers'; // default export from providers.tsx

const inter = Inter({ subsets: ['latin'] });

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    // FIX 1: The font className is moved to the HTML tag. 
    // FIX 2: suppressHydrationWarning must remain for next-themes.
    <html lang="en" suppressHydrationWarning className={inter.className}> 
      <body>
        <Providers>
          {children}
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}