import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='ko'>
      <body className='bg-white text-gray-900'>
        {/* 공통 헤더 */}
        <Header />

        {/* 메인 콘텐츠 */}
        <main className='min-h-screen pt-70'>{children}</main>

        {/* 공통 푸터 */}
        <Footer />
        <div id='modal-root' />
      </body>
    </html>
  );
}
