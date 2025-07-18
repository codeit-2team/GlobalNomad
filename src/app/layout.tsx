'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './globals.css';
import Pagination from '@/components/Pagination';
import { useState } from 'react';
import { se } from 'date-fns/locale';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [page, setPage] = useState(2);

  return (
    <html lang='ko'>
      <body className='bg-white text-gray-900'>
        {/* 공통 헤더 */}
        <Header />

        {/* 메인 콘텐츠 */}
        <main className='min-h-screen pt-70'>
          {children}
          <Pagination currentPage={1} totalPage={10} onPageChange={setPage} />
        </main>

        {/* 공통 푸터 */}
        <Footer />
      </body>
    </html>
  );
}
