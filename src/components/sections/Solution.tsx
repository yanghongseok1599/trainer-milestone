"use client";

import { motion } from "framer-motion";
import { ArrowRight, PenLine, ImagePlus, Users } from "lucide-react";

const beforeAfter = [
  { before: "블로그 3시간", after: "10분" },
  { before: "카드뉴스 2시간", after: "3분" },
  { before: "서로이웃 2시간", after: "자동" },
];

const features = [
  {
    icon: PenLine,
    title: "AI 블로그 글쓰기",
    desc: "PT 전문 용어가 자연스럽게 녹아든 SEO 최적화 글을 10분 만에",
  },
  {
    icon: ImagePlus,
    title: "비포애프터 자동 생성",
    desc: "회원 변화 비교 이미지를 전문 템플릿으로 클릭 한 번에",
  },
  {
    icon: Users,
    title: "서로이웃 자동화",
    desc: "피트니스 블로거 자동 탐색, 신청, 수락까지 24시간 자동",
  },
];

export function Solution() {
  return (
    <section className="py-20 sm:py-28">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4">
            <span className="text-primary">트레이너 마일스톤</span>으로 해결하세요
          </h2>
          <p className="text-muted-foreground">
            피트니스 전문가 10년 경력자들이 만든 AI 마케팅 도구
          </p>
        </motion.div>

        {/* Before/After */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-3 gap-4 mb-16"
        >
          {beforeAfter.map((item, index) => (
            <div key={index} className="text-center p-4 rounded-xl bg-primary/5 border border-primary/20">
              <p className="text-xs text-muted-foreground line-through mb-1">{item.before}</p>
              <div className="flex items-center justify-center gap-2">
                <ArrowRight className="w-4 h-4 text-primary" />
                <p className="text-2xl font-bold text-primary">{item.after}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Features */}
        <div className="space-y-4">
          {features.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-4 p-5 rounded-xl bg-muted/50 border"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
