import './globals.css';
import QueryProvider from '@/lib/queryProvider';
import { Toaster } from 'sonner';

export const metadata = {
  title: 'GlobalNomad',
  description: '글로벌 노마드 체험 플랫폼',
  keywords: ['글로벌 노마드', '체험 플랫폼', '여행', '노마드', '다양한 활동'],
  authors: [{ name: 'GlobalNomad', url: 'https://globalnomad.site/' }],
  openGraph: {
    title: 'GlobalNomad',
    description: '전 세계 체험을 한 눈에!',
    url: 'https://globalnomad.site/',
    siteName: 'GlobalNomad',
    locale: 'ko_KR',
    type: 'website',
    images: [
      {
        url: 'https://globalnomad.site/og-image.png',
        width: 1200,
        height: 630,
        alt: 'GlobalNomad 메인 배너 이미지',
      },
    ],
    icons: {
      icon: '/favicon.ico',
      apple: '/apple-touch-icon.png',
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='ko'>
      <body>
        <QueryProvider>
          <main>{children}</main>
        </QueryProvider>
        <Toaster richColors position='top-center' />
        <div id='modal-root' />
      </body>
    </html>
  );
}
