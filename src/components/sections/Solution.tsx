"use client";

import { motion } from "framer-motion";
import { Check, Zap, Clock, TrendingUp, Users, Star } from "lucide-react";

const beforeAfter = [
  {
    before: "블로그 1개 3시간",
    after: "10분",
    icon: Clock,
  },
  {
    before: "카드뉴스 2시간",
    after: "3분",
    icon: Zap,
  },
  {
    before: "서로이웃 100명 2시간",
    after: "자동",
    icon: Users,
  },
  {
    before: "상위노출 0건",
    after: "평균 5건/월",
    icon: TrendingUp,
  },
];

const fitnessFeatures = [
  "PT/필라테스/요가 전문 용어 10만개+ 학습",
  "네이버 블로그 SEO 알고리즘 실시간 반영",
  "비포애프터 이미지 1클릭 자동 생성",
  "서로이웃 신청/수락 24시간 자동화",
  "황금 키워드 실시간 발굴 시스템",
  "경쟁 센터 마케팅 전략 분석",
];

const stats = [
  {
    number: "347",
    unit: "%",
    label: "평균 신규문의 증가율",
    detail: "사용 3개월 후 측정",
  },
  {
    number: "15",
    unit: "시간",
    label: "주당 절약 시간",
    detail: "마케팅 업무 자동화",
  },
  {
    number: "1,247",
    unit: "명",
    label: "현재 사용 중",
    detail: "피트니스 전문가",
  },
  {
    number: "4.9",
    unit: "/5",
    label: "사용자 만족도",
    detail: "1,000+ 리뷰 기준",
  },
];

export function Solution() {
  return (
    <section className="py-16 sm:py-24 md:py-32 bg-foreground text-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-1.5 text-primary mb-3">
            <Star className="w-4 h-4 fill-primary" />
            <span className="text-xs sm:text-sm font-medium">해결책</span>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight mb-3 sm:mb-4">
            <span className="text-primary">트레이너 마일스톤</span>으로
            <br />
            마케팅 자동화하세요
          </h2>
          <p className="text-[13px] sm:text-sm md:text-base text-background/60 max-w-xs sm:max-w-2xl mx-auto leading-relaxed">
            피트니스 업계 <span className="text-primary font-semibold">10년 경력 전문가</span>들이
            <br />
            직접 만든 <span className="text-primary font-semibold">피트니스 전용 AI</span>입니다.
          </p>
        </motion.div>

        {/* Before/After Comparison */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-10 sm:mb-16"
        >
          {beforeAfter.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center p-3 sm:p-5 rounded-xl bg-background/5 border border-background/10"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-2 sm:mb-3">
                <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              </div>
              <p className="text-[11px] sm:text-xs text-background/40 line-through mb-1">{item.before}</p>
              <p className="text-lg sm:text-xl md:text-2xl font-bold text-primary">{item.after}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-10 sm:mb-16"
        >
          {fitnessFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-center gap-2.5 p-3 sm:p-4 rounded-xl bg-background/5 border border-background/10"
            >
              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary" />
              </div>
              <span className="text-[13px] sm:text-sm">{feature}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-8 sm:pt-12 border-t border-background/10"
        >
          {stats.map((item, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-0.5 sm:mb-1">
                <span className="text-primary">{item.number}</span>
                <span className="text-base sm:text-lg md:text-xl lg:text-2xl text-background/40">
                  {item.unit}
                </span>
              </div>
              <p className="text-[11px] sm:text-xs md:text-sm font-medium mb-0.5">{item.label}</p>
              <p className="text-[10px] sm:text-xs text-background/40">{item.detail}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
