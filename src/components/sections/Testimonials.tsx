"use client";

import { motion } from "framer-motion";
import { Star, Quote, TrendingUp, Clock, Users, MessageSquare } from "lucide-react";

const testimonials = [
  {
    content: "3개월 동안 새벽까지 블로그 썼는데 문의 0건이었어요. 마일스톤 쓰고 첫 달에 신규 문의 12건 받았습니다. 진짜 울뻔했어요.",
    name: "김도현",
    role: "PT 트레이너 / 강남",
    metric: "문의 0건 → 12건",
    metricIcon: MessageSquare,
    rating: 5,
  },
  {
    content: "매일 2시간씩 서로이웃 수작업 하다가 지쳐서 마케팅 포기했었는데, 이제 자동으로 돌아가니까 본업에만 집중해요. 회원 만족도도 올랐어요.",
    name: "박서연",
    role: "필라테스 강사 / 분당",
    metric: "일 2시간 → 자동화",
    metricIcon: Clock,
    rating: 5,
  },
  {
    content: "경쟁 센터 분석 기능이 진짜 사기예요. 옆 센터가 어떤 키워드로 상위노출 되는지 다 보여서, 그거 따라했더니 저도 1페이지 진입했어요.",
    name: "이준혁",
    role: "헬스장 대표 / 일산",
    metric: "검색 1페이지 달성",
    metricIcon: TrendingUp,
    rating: 5,
  },
  {
    content: "블로그 글 하나 쓰는데 3시간 걸렸는데 이제 10분이면 끝나요. 심지어 제가 쓴 것보다 더 전문가스러워요. 월 60시간 아끼고 있어요.",
    name: "최유진",
    role: "요가 강사 / 해운대",
    metric: "월 60시간 절약",
    metricIcon: Clock,
    rating: 5,
  },
  {
    content: "카드뉴스 외주 맡기면 장당 5만원인데, 이제 3분이면 제가 직접 만들어요. 한 달에 30만원 이상 절약하고 있습니다.",
    name: "정민우",
    role: "크로스핏 코치 / 수원",
    metric: "월 30만원+ 절약",
    metricIcon: TrendingUp,
    rating: 5,
  },
  {
    content: "솔직히 AI 글이라 티 날까봐 걱정했는데, 회원님들이 '선생님 블로그 글 좋아요'라고 먼저 말해주세요. 전문성 있어 보인다고.",
    name: "한소희",
    role: "PT 트레이너 / 대전",
    metric: "회원 신뢰도 상승",
    metricIcon: Users,
    rating: 5,
  },
];

const overallStats = [
  { label: "평균 만족도", value: "4.9/5" },
  { label: "재구독률", value: "94%" },
  { label: "추천 의향", value: "97%" },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-16 sm:py-24 md:py-32 border-t">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <div className="flex justify-center gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <p className="text-[11px] sm:text-xs text-muted-foreground mb-2 sm:mb-3">
            1,000+ 리뷰 평균 4.9점
          </p>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight mb-3 sm:mb-4">
            실제 사용자들의 솔직한 후기
          </h2>
          <p className="text-[13px] sm:text-sm md:text-base text-muted-foreground max-w-xl mx-auto">
            &ldquo;정말 효과 있나요?&rdquo; 직접 써보신 분들의 이야기입니다.
          </p>
        </motion.div>

        {/* Overall Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="grid grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12 p-4 sm:p-6 rounded-2xl bg-primary/5 border border-primary/20"
        >
          {overallStats.map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-xl sm:text-2xl md:text-3xl font-bold text-primary">{stat.value}</p>
              <p className="text-[11px] sm:text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-4 sm:p-6 rounded-2xl bg-muted/30 border border-border hover:border-primary/30 transition-colors"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <testimonial.metricIcon className="w-4 h-4 text-primary" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-primary">{testimonial.metric}</span>
              </div>
              
              <Quote className="w-6 h-6 text-muted-foreground/30 mb-2" />
              <p className="text-[13px] sm:text-sm leading-relaxed mb-4">
                {testimonial.content}
              </p>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-[13px] sm:text-sm">{testimonial.name}</p>
                  <p className="text-[11px] sm:text-xs text-muted-foreground">{testimonial.role}</p>
                </div>
                <div className="flex gap-0.5">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 sm:mt-12 text-center"
        >
          <p className="text-[11px] sm:text-xs text-muted-foreground">
            * 모든 후기는 실제 사용자의 동의를 받아 게재되었습니다.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
