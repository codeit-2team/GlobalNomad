export const metadata = {
  title: 'GlobalNomad',
  description: '글로벌 노마드 체험 플랫폼',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
