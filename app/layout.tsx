import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  metadataBase: new URL('https://omar-alothman-portfolio.foamy-chord-1467.chatgpt.site'),
  icons: { icon: '/favicon.svg' },
  title: 'Omar Alothman — Art Director & Filmmaker',
  description: 'Films, photography and visual experiments by Omar Alothman. Art director, filmmaker and artist based in Dubai.',
};
export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) {
  return <html lang="en"><body>{children}</body></html>;
}
