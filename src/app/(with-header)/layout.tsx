import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* 공통 헤더 */}
      <Header />

      {/* 메인 콘텐츠 */}
      <main className='min-h-screen pt-70'>{children}</main>

      {/* 공통 푸터 */}
      <Footer />
    </>
  );
}
