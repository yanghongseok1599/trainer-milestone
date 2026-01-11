"use client";

import { motion } from "framer-motion";
import { X, AlertTriangle, Clock, TrendingDown, Users } from "lucide-react";

const painPoints = [
  {
    icon: Clock,
    stat: "주 15시간+",
    problem: "블로그 1개 쓰는데 3시간, 일주일에 5개면 15시간",
    detail: "PT 끝나고 새벽까지 글 쓰다가 다음날 컨디션 박살",
  },
  {
    icon: TrendingDown,
    stat: "상위노출 0건",
    problem: "아무리 써도 검색에 안 잡히는 내 블로그",
    detail: "3개월 동안 매일 글 썼는데 일 방문자 20명... 시간 낭비였나?",
  },
  {
    icon: Users,
    stat: "신규문의 0건",
    problem: "인스타, 블로그 다 해봤는데 문의가 안 옴",
    detail: "광고비만 날리고 결국 지인 소개에만 의존하는 현실",
  },
];

const generalAIProblems = [
  {
    problem: "ChatGPT로 글 쓰면 '운동하면 건강해집니다' 수준",
    detail: "전문가가 쓴 글 같지 않아서 신뢰도 0점",
  },
  {
    problem: "비포애프터, 카드뉴스? 디자이너 없으면 못 만듦",
    detail: "캔바로 3시간 끙끙대다 포기한 적 한두 번이 아님",
  },
  {
    problem: "서로이웃 100명 신청하는데 하루 2시간",
    detail: "매일 수작업으로 클릭클릭... 이게 마케팅인가 노가다인가",
  },
  {
    problem: "황금 키워드? 어떻게 찾는지도 모르겠음",
    detail: "경쟁 센터는 상위노출 되는데 나만 검색해도 안 나옴",
  },
];

export function Problem() {
  return (
    <section className="py-16 sm:py-24 md:py-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12"
        >
          <div className="inline-flex items-center gap-1.5 text-destructive mb-3">
            <AlertTriangle className="w-4 h-4" />
            <span className="text-xs sm:text-sm font-medium">이 문제, 나만 겪는 게 아니었음</span>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight mb-3 sm:mb-4">
            피트니스 마케팅,
            <br />
            <span className="text-destructive">왜 이렇게 힘든 걸까요?</span>
          </h2>
          <p className="text-[13px] sm:text-sm md:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
            설문조사 결과, 피트니스 전문가 <span className="font-semibold text-foreground">87%</span>가
            <br />
            &ldquo;마케팅에 지쳐서 본업에 집중 못한다&rdquo;고 답했습니다.
          </p>
        </motion.div>

        {/* Pain Points with Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="grid sm:grid-cols-3 gap-4 mb-8 sm:mb-12"
        >
          {painPoints.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center p-4 sm:p-6 rounded-2xl bg-destructive/5 border border-destructive/20"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-3">
                <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-destructive" />
              </div>
              <p className="text-xl sm:text-2xl font-bold text-destructive mb-1">{item.stat}</p>
              <p className="font-medium text-[13px] sm:text-sm mb-1">{item.problem}</p>
              <p className="text-[11px] sm:text-xs text-muted-foreground">{item.detail}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Why General AI Fails */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <p className="text-center text-sm sm:text-base font-medium mb-4 text-muted-foreground">
            &ldquo;그래서 ChatGPT 써봤는데...&rdquo;
          </p>
          <div className="space-y-3">
            {generalAIProblems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start gap-3 p-3 sm:p-4 rounded-xl bg-muted/50 border border-border"
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0">
                  <X className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-destructive" />
                </div>
                <div>
                  <p className="font-medium text-[13px] sm:text-sm md:text-base mb-0.5">{item.problem}</p>
                  <p className="text-[11px] sm:text-xs md:text-sm text-muted-foreground">{item.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center p-6 sm:p-8 rounded-2xl bg-primary/5 border border-primary/20"
        >
          <p className="text-base sm:text-lg md:text-xl font-semibold mb-2">
            일반 AI는 피트니스를 모릅니다.
          </p>
          <p className="text-sm sm:text-base text-muted-foreground">
            PT 전문 용어, 네이버 SEO, 비포애프터 제작, 서로이웃 문화...
            <br />
            <span className="font-semibold text-primary">피트니스 전용으로 훈련된 AI</span>가 필요합니다.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
