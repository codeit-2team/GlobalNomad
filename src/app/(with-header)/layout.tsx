import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function WithHeaderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className='pt-70'>{children}</main>
      <Footer />
    </>
  );
}
