"use client";

import Link from "next/link";

const footerLinks = [
  { label: "기능", href: "#features" },
  { label: "후기", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
  { label: "이용약관", href: "#" },
  { label: "개인정보처리방침", href: "#" },
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

        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t text-center">
          <p className="text-[10px] sm:text-xs text-muted-foreground">
            © 2024 트레이너 마일스톤. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
