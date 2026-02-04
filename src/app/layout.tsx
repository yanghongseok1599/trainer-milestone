import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://trainer-milestone.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "트레이너 마일스톤 | 피트니스 전문가를 위한 AI 자동화 플랫폼",
    template: "%s | 트레이너 마일스톤",
  },
  description:
    "일반 AI로는 안 됩니다. 피트니스 전용 AI가 필요합니다. 블로그 글쓰기, 카드뉴스 제작, 서로이웃 자동화까지. 24가지 피트니스 전문 AI 도구로 주당 15시간을 절약하세요.",
  alternates: {
    canonical: siteUrl,
    languages: { ko: `${siteUrl}/` },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "트레이너 마일스톤 | 피트니스 전용 AI 마케팅 플랫폼",
    description:
      "PT, 필라테스, 요가 전문가를 위한 국내 유일 피트니스 전용 AI. 블로그 SEO, 카드뉴스, 비포애프터, 서로이웃 자동화까지 24가지 도구를 한 곳에서.",
    siteName: "트레이너 마일스톤",
    locale: "ko_KR",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "트레이너 마일스톤 - 피트니스 전용 AI 마케팅 플랫폼",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "트레이너 마일스톤 | 피트니스 전용 AI",
    description:
      "일반 AI로는 안 됩니다. 피트니스 전용 AI로 주당 15시간을 절약하세요.",
    images: [`${siteUrl}/og-image.png`],
  },
  keywords: [
    "피트니스 마케팅",
    "PT 블로그",
    "트레이너 자동화",
    "피트니스 AI",
    "네이버 블로그 SEO",
    "카드뉴스 제작",
    "서로이웃 자동화",
    "피트니스 전용 AI",
    "필라테스 마케팅",
    "요가 마케팅",
    "헬스장 마케팅",
    "PT 마케팅",
  ],
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
  category: "technology",
  verification: {
    // google: "구글서치콘솔인증코드",
    other: {
      "naver-site-verification": "b422bdbc4e23d52d5e8ac87d6d27bc8eeac4c16d",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css"
        />
      </head>
      <body className={`${geistMono.variable} antialiased`}>{children}</body>
    </html>
  );
}
