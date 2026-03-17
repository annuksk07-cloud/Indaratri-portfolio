import type {Metadata} from 'next';
import { Cormorant_Garamond, DM_Sans, Space_Mono } from 'next/font/google';
import './globals.css'; // Global styles

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-dm-sans',
});

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono',
});

export const metadata: Metadata = {
  title: 'Indaratri | Creative Designer & AI Specialist',
  description: 'Portfolio of Indaratri, a freelance designer and AI creative specialist based in India.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable} ${spaceMono.variable}`}>
      <body className="bg-[#0A0A0F] text-[#F5F3FF] font-sans antialiased selection:bg-[#7C3AED] selection:text-white" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
