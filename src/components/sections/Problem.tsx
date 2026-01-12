"use client";

import { motion } from "framer-motion";
import { Clock, TrendingDown, Frown } from "lucide-react";

const problems = [
  {
    icon: Clock,
    title: "주 15시간+",
    desc: "블로그, 카드뉴스, 서로이웃... 끝이 없는 마케팅 노가다",
  },
  {
    icon: TrendingDown,
    title: "상위노출 0건",
    desc: "3개월 매일 글 써도 검색에 안 잡히는 내 블로그",
  },
  {
    icon: Frown,
    title: "신규문의 0건",
    desc: "결국 지인 소개에만 의존하는 답답한 현실",
  },
];

export function Problem() {
  return (
    <section className="py-20 sm:py-28 bg-muted/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4">
            트레이너들의 <span className="text-destructive">공통된 고민</span>
          </h2>
          <p className="text-muted-foreground">
            운동 가르치는 건 자신 있는데, 마케팅은 너무 어렵습니다.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-6">
          {problems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center p-6 rounded-2xl bg-background border"
            >
              <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
                <item.icon className="w-6 h-6 text-destructive" />
              </div>
              <p className="text-2xl font-bold text-destructive mb-2">{item.title}</p>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
