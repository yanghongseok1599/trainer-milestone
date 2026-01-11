"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, TrendingUp } from "lucide-react";

export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center pt-12 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center mb-4 sm:mb-6"
        >
          <Badge variant="outline" className="px-3 py-1.5 text-xs sm:text-sm border-primary/30 bg-primary/5">
            <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 text-primary" />
            평균 신규문의 347% 증가
          </Badge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-[1.75rem] leading-[1.25] sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-4 sm:mb-6"
        >
          <span className="block">매일 새벽까지 블로그 쓰다가</span>
          <span className="block mt-1 text-muted-foreground">
            결국 마케팅 포기하셨죠?
          </span>
          <span className="block mt-2">
            <span className="text-primary">10분이면 끝납니다.</span>
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-sm leading-relaxed sm:text-base md:text-lg text-muted-foreground max-w-xs sm:max-w-2xl mx-auto mb-6 sm:mb-10 px-2"
        >
          &ldquo;글 하나 쓰는데 3시간, 카드뉴스에 2시간, 서로이웃 신청에 1시간...&rdquo;
          <br />
          <span className="font-semibold text-foreground">주 15시간 마케팅 노가다</span>를
          <br className="sm:hidden" />
          <span className="hidden sm:inline"> </span>
          <span className="font-semibold text-primary">하루 30분</span>으로 줄여드립니다.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-3 justify-center px-6 sm:px-0"
        >
          <Button size="lg" className="rounded-full px-6 h-11 text-sm sm:text-base" asChild>
            <Link href="/signup">
              7일 무료체험 시작하기
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="ghost"
            className="rounded-full px-6 h-11 text-sm sm:text-base text-muted-foreground"
            asChild
          >
            <Link href="#features">어떻게 가능한지 보기</Link>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 text-[11px] sm:text-xs text-muted-foreground"
        >
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            현재 1,247명 사용 중
          </span>
          <span className="hidden sm:inline text-muted-foreground/30">|</span>
          <span>카드 등록 없이 무료 시작</span>
          <span className="hidden sm:inline text-muted-foreground/30">|</span>
          <span>언제든 해지 가능</span>
        </motion.div>
      </div>
    </section>
  );
}
