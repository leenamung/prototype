// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css"; // Import global styles
import BottomTabBar from "./components/BottomTabBar"; // Import the BottomTabBar component

// Define metadata for the application
export const metadata: Metadata = {
  title: "나의 작은 일기장", // Default title for the app
  description: "매일의 생각과 감정을 기록하세요.", // Default description
};

// Root layout component applying to all routes
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode; // Type for children components
}>) {
  return (
    <html lang="ko">
      {/* Ensure no whitespace or comments directly inside <html> before <head> */}
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"></meta>
        {/* Preconnect hints for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Load Pacifico font from Google Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap"
          rel="stylesheet"
        />
        {/* Load Pretendard font from CDN */}
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
        {/* Load Remixicon icon library from CDN */}
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/remixicon/4.6.0/remixicon.min.css"
          rel="stylesheet"
        />
      </head>
      {/* Ensure no whitespace or comments between </head> and <body> */}
      {/* Apply padding-bottom to the body to prevent content from being hidden by the fixed BottomTabBar */}
      <body>
        {/* ✅ [추가] 노이즈 배경을 위한 전용 div */}
        <div className="noise-background" />
        
        {/* ✅ [수정] 콘텐츠를 감싸는 wrapper div 추가 */}
        <div className="content-wrapper pb-16">
          {children}
        </div>
        <BottomTabBar />
      </body>
      {/* Ensure no whitespace or comments after </body> or before </html> */}
    </html>
  );
}
