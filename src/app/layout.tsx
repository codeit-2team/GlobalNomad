import './globals.css';
import QueryProvider from '@/lib/queryProvider';
import { Toaster } from 'sonner';

export const metadata = {
  title: 'GlobalNomad',
  description: '글로벌 노마드 체험 플랫폼',
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
