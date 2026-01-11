"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "계정이 정지되지 않나요?",
    answer:
      "자연스러운 패턴을 모방하여 안전합니다. 7년간 정지 사례가 없습니다.",
  },
  {
    question: "AI가 쓴 글이 티가 나나요?",
    answer:
      "피트니스 전문가의 실제 글을 학습하여 자연스럽게 작성합니다.",
  },
  {
    question: "환불이 가능한가요?",
    answer:
      "30일 이내 100% 환불을 보장합니다.",
  },
  {
    question: "무료 체험 후 자동 결제되나요?",
    answer:
      "아니요. 직접 결제하지 않으면 과금되지 않습니다.",
  },
  {
    question: "팀원과 함께 사용할 수 있나요?",
    answer:
      "비즈니스 플랜에서 최대 5명까지 초대 가능합니다.",
  },
  {
    question: "어떤 플랫폼을 지원하나요?",
    answer:
      "네이버 블로그에 최적화되어 있습니다. 카드뉴스는 모든 SNS에서 사용 가능합니다.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="py-16 sm:py-24 md:py-32 border-t">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12"
        >
          <p className="text-[11px] sm:text-xs text-muted-foreground mb-2 sm:mb-3">FAQ</p>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight">
            자주 묻는 질문
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={"item-" + index} className="border-b-0 border-t">
                <AccordionTrigger className="text-left text-[13px] sm:text-sm font-normal py-3 sm:py-5 hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-[11px] sm:text-xs text-muted-foreground pb-3 sm:pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
