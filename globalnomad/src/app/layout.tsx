<<<<<<< HEAD
=======
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import './globals.css';

>>>>>>> 4a395a82bcb2ef56bf66c1536aaec8d1f5bc147c
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
<<<<<<< HEAD
    <html lang='ko'>
      <body>{children}</body>
    </html>
  );
}
=======
    <html lang="ko">
      <body className="bg-white text-gray-900">
        {/* 공통 헤더 */}
        <Header />

        {/* 메인 콘텐츠 */}
        <main className="pt-70 min-h-screen">
          {children}
        </main>

        {/* 공통 푸터 */}
        <Footer />
      </body>
    </html>
  );
}
>>>>>>> 4a395a82bcb2ef56bf66c1536aaec8d1f5bc147c
