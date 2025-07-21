// src/app/(with-header)/layout.tsx
import '@/app/globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/app/(with-header)/components/heroSection';

export default function WithHeaderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* 헤더와 푸터 */}
      <Header />
      <main className="pt-70">
        <HeroSection />        
      </main>
      <Footer />
    </>
  );
}
