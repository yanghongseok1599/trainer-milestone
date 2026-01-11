"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navItems = [
  { label: "기능", href: "#features" },
  { label: "후기", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/70 backdrop-blur-xl">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-11 sm:h-12">
          <Link href="/" className="font-semibold text-xs sm:text-sm tracking-tight">
            트레이너 마일스톤
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/login"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              로그인
            </Link>
            <Button size="sm" className="h-7 text-xs rounded-full px-4" asChild>
              <Link href="/signup">시작하기</Link>
            </Button>
          </div>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs px-8">
              <nav className="flex flex-col gap-5 mt-10">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="text-xl font-medium"
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="flex flex-col gap-3 mt-6 pt-6 border-t">
                  <Button variant="outline" className="rounded-full h-10 text-sm" asChild>
                    <Link href="/login" onClick={() => setIsOpen(false)}>로그인</Link>
                  </Button>
                  <Button className="rounded-full h-10 text-sm" asChild>
                    <Link href="/signup" onClick={() => setIsOpen(false)}>시작하기</Link>
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
