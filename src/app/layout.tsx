import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import GoogleAnalytics from "../lib/GoogleAnalytics";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const APP_NAME = "Project Zombuilder";
const APP_DEFAULT_TITLE = "좀보이드 특성 추천 서비스";
const APP_TITLE_TEMPLATE = "%s - ProjectZombuilder";
const APP_DESCRIPTION = "좀빌더는 좀보이드의 특성 빌드를 보다 편하게 계산하고 공유할 수 있도록 제작한 서비스입니다.";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  icons: {
    icon: "/favicon.ico",
  },
  keywords: [
    "zombuilder",
    "좀빌더",
    "좀보이드 특성",
    "좀보이드 특성 추천",
    "좀보이드 빌더",
    "좀보이드 직업",
    "좀보이드 직업 추천",
    "좀보이드 계산기",
    "좀보이드 모드",
    "산보이드 특성",
    "산보이드 직업",
  ],
  authors: [
    {
      name: "대림대학교 ZomBuilder팀",
      url: "https://github.com/kgw-coding/ZomBuilder-frontend",
    },
  ],
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
    url: "https://zombuilder.com/",
    // images: [
    //   {
    //     url: "https://zombuilder.com/zomboid-logo.png",
    //     width: 1200,
    //     height: 630,
    //     alt: "좀빌더 서비스 소개 이미지",
    //   },
    // ],
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
  verification : {
    other : {
      "naver-site-verification" : "04135524ed179612a6c4e04ff8076de9fcb1a21c"
    }
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
          {/* Google Analytics 붙임 */}
          {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ? (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
        ) : null}
        {children}
      </body>
    </html>
  );
}