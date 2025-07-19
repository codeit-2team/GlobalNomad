export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ko'>
      <body className='bg-white text-gray-900'>
        {/* 메인 콘텐츠 */}
        <main className='min-h-screen pt-70'>{children}</main>
      </body>
    </html>
  );
}
