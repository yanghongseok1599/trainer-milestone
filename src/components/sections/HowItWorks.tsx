"use client";

import { motion } from "framer-motion";

const steps = [
  {
    step: "01",
    title: "가입",
    description: "30초면 충분합니다",
  },
  {
    step: "02",
    title: "선택",
    description: "필요한 도구를 고르세요",
  },
  {
    step: "03",
    title: "설정",
    description: "키워드와 일정을 정하세요",
  },
  {
    step: "04",
    title: "완료",
    description: "AI가 나머지를 처리합니다",
  },
];

export function HowItWorks() {
  return (
    <section className="py-16 sm:py-24 md:py-32 border-t">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <p className="text-[11px] sm:text-xs text-muted-foreground mb-2 sm:mb-3">사용 방법</p>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight">
            시작은 간단합니다
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-10"
        >
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-light text-muted-foreground/30 mb-1.5 sm:mb-3">
                {step.step}
              </div>
              <h3 className="text-sm sm:text-base md:text-lg font-medium mb-0.5 sm:mb-1">{step.title}</h3>
              <p className="text-[11px] sm:text-xs text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
