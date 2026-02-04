"use client";

import Link from "next/link";

const footerLinks = [
  { label: "기능", href: "#features" },
  { label: "후기", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
  { label: "이용약관", href: "/terms" },
  { label: "개인정보처리방침", href: "/privacy" },
];

export function Footer() {
  return (
    <footer className="border-t">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 sm:gap-8">
          <div className="text-center md:text-left">
            <Link href="/" className="font-semibold text-xs sm:text-sm">
              트레이너 마일스톤
            </Link>
            <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">
              피트니스 전문가를 위한 AI 플랫폼
            </p>
          </div>

          <nav className="flex flex-wrap justify-center gap-x-4 sm:gap-x-8 gap-y-2">
            {footerLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[10px] sm:text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* 사업자 정보 */}
        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t">
          <p className="text-[10px] sm:text-xs text-muted-foreground text-center">
            브랜드 : 트레이너 마일스톤 ㅣ 상호 : 헤븐데일리 ㅣ 대표 : 김지민 ㅣ 사업자등록번호 : 506-54-000971 ㅣ 소재지 : 강원특별자치도 동해시 해안로 449 ㅣ 통신판매신고번호 : 제2026-강원동해-0022호 ㅣ 전화 : 010-7545-1599 ㅣ 개인정보관리책임자 : 김지민 ㅣ 문의 : info@trainer_milestone.com
          </p>
          <p className="text-[10px] sm:text-xs text-muted-foreground text-center mt-2">
            © 2025 트레이너 마일스톤. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
