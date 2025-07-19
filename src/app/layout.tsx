import './globals.css';
import QueryProvider from '@/lib/queryProvider';

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

        <div id='modal-root' />
      </body>
    </html>
  );
}
