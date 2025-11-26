import type { Metadata } from "next";
import "./styles/globals.css"; 
import LayoutWrapper from "./components/layout/LayoutWrapper";
import { Gowun_Dodum, Pacifico } from 'next/font/google';

const gowunDodum = Gowun_Dodum({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-gowun-dodum',
  display: 'swap',
});

const pacifico = Pacifico({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-pacifico',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "나의 작은 일기장",
  description: "매일의 생각과 감정을 기록하세요.",
};

export default function RootLayout({
  children, modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${gowunDodum.variable} ${pacifico.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"></meta>
        {/* Pretendard & RemixIcon (CDN) */}
        <link rel="stylesheet" as="style" crossOrigin="anonymous" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css" />
        <link href="https://cdnjs.cloudflare.com/ajax/libs/remixicon/4.6.0/remixicon.min.css" rel="stylesheet" />
        
        {/* Maru Buri (구글 폰트에 없을 수 있어 CDN 유지) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link href="https://fonts.googleapis.com/css2?family=Maru+Buri:wght@300;400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <div className="noise-background" />
        <LayoutWrapper>
          {children}
          {modal}
        </LayoutWrapper>
      </body>
    </html>
  );
}