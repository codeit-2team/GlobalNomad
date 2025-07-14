import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='ko'>
      <body>
        {children}
        <div id='modal-root'></div>
      </body>
    </html>
  );
}
