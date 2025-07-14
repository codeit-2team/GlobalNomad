import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import './globals.css'; // Tailwind CSS가 포함된 경우

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="bg-white text-gray-900">
        {/* 공통 헤더 */}
        <Header />

        {/* 메인 콘텐츠 */}
        <main className="pt-20 min-h-screen">
          {children}
        </main>

        {/* 공통 푸터 */}
        <Footer />
      </body>
    </html>
  );
}