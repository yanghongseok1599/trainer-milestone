"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Clock, CreditCard } from "lucide-react";

const guarantees = [
  {
    icon: Clock,
    text: "7일 무료 체험",
  },
  {
    icon: CreditCard,
    text: "카드 등록 불필요",
  },
  {
    icon: Shield,
    text: "언제든 해지 가능",
  },
];

export function CTA() {
  return (
    <section className="py-16 sm:py-24 md:py-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-sm sm:text-base text-muted-foreground mb-3">
            아직도 새벽까지 블로그 쓰실 건가요?
          </p>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight mb-3 sm:mb-4">
            <span className="text-primary">10분</span>이면 끝나는 마케팅,
            <br />
            지금 시작하세요
          </h2>
          <p className="text-[13px] sm:text-sm md:text-base text-muted-foreground mb-6 sm:mb-8 px-2">
            이미 <span className="font-semibold text-foreground">1,247명</span>의 피트니스 전문가가
            <br className="sm:hidden" />
            <span className="hidden sm:inline"> </span>
            마케팅 스트레스에서 벗어났습니다.
          </p>

          {/* Guarantees */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-6 sm:mb-8">
            {guarantees.map((item, index) => (
              <div key={index} className="flex items-center gap-1.5 text-[11px] sm:text-xs text-muted-foreground">
                <item.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
                <span>{item.text}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center px-6 sm:px-0">
            <Button size="lg" className="rounded-full px-8 h-12 sm:h-14 text-sm sm:text-base font-semibold" asChild>
              <Link href="/signup">
                7일 무료체험 시작하기
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
            </Button>
          </div>

          <p className="mt-4 sm:mt-6 text-[11px] sm:text-xs text-muted-foreground">
            가입 후 <span className="font-semibold">30초</span> 만에 첫 블로그 글 작성 가능
          </p>
        </motion.div>
      </div>
    </section>
  );
}
