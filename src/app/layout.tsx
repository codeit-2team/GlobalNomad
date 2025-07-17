import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='ko'>
      <div id='modal-root'>
        <body className='bg-white text-gray-900'>
          {/* 공통 헤더 */}
          <Header />

          {/* 메인 콘텐츠 */}
          <main className='min-h-screen pt-70'>{children}</main>

          {/* 공통 푸터 */}
          <Footer />
        </body>
      </div>
    </html>
  );
}
