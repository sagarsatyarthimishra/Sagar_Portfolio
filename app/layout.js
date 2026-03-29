import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

export const metadata = {
  title: 'Sagar Satyarthi Mishra | Full Stack Software Developer',
  description: 'Animated portfolio built with Next.js, Three.js, GSAP, R3F, and Framer Motion.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
