"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="min-h-[90vh] flex items-center justify-center pt-12 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-xs sm:text-sm text-muted-foreground mb-4"
        >
          피트니스 전문가를 위한 AI 마케팅 도구
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
        >
          <span className="block">블로그 한 개 쓰는데</span>
          <span className="block text-primary mt-2">3시간씩 쓰고 계세요?</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed"
        >
          PT 끝나고 새벽까지 마케팅하느라 지치셨죠?
          <br />
          <span className="text-foreground font-semibold">트레이너 마일스톤</span>이
          <span className="text-primary font-semibold"> 10분</span>으로 줄여드립니다.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-3 justify-center mb-6"
        >
          <Button size="lg" className="rounded-full px-8 h-12 text-base font-semibold" asChild>
            <Link href="/signup">
              무료로 시작하기
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xs text-muted-foreground"
        >
          카드 등록 없이 바로 시작 · 1,200+ 트레이너 사용 중
        </motion.p>
      </div>
    </section>
  );
}
