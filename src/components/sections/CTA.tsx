"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";

const benefits = [
  "카드 등록 없이 무료 시작",
  "가입 후 30초 만에 첫 글 작성",
  "언제든 해지 가능",
];

export function CTA() {
  return (
    <section className="py-20 sm:py-28 bg-foreground text-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4">
            더 이상 새벽까지
            <br />
            <span className="text-primary">마케팅에 시간 쓰지 마세요</span>
          </h2>

          <p className="text-background/60 mb-8 text-lg">
            지금 시작하면 오늘부터 마케팅 시간이 줄어듭니다.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {benefits.map((text, index) => (
              <div key={index} className="flex items-center gap-2 text-sm text-background/80">
                <Check className="w-4 h-4 text-primary" />
                <span>{text}</span>
              </div>
            ))}
          </div>

          <Button
            size="lg"
            className="rounded-full px-10 h-14 text-lg font-semibold bg-primary hover:bg-primary/90"
            asChild
          >
            <Link href="/signup">
              무료로 시작하기
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
