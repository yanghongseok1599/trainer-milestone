"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";
import {
  PenLine,
  ImagePlus,
  LayoutGrid,
  BookOpen,
  Dumbbell,
  TrendingUp,
  Search,
  BarChart3,
  Users,
  Heart,
  Instagram,
  Megaphone,
  UserCheck,
  Palette,
  Target,
  Sparkles,
} from "lucide-react";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  isNew?: boolean;
}

interface Category {
  id: string;
  name: string;
  description: string;
  color: string;
  isNew?: boolean;
  features: Feature[];
}

const categories: Category[] = [
  {
    id: "blog",
    name: "블로그 마케팅",
    description: "네이버 블로그 SEO 완벽 대응",
    color: "bg-emerald-500",
    features: [
      {
        icon: PenLine,
        title: "AI 블로그 글쓰기",
        description: "PT/필라테스 전문 용어가 자연스럽게 반영된 SEO 최적화 글",
      },
      {
        icon: Search,
        title: "황금 키워드 분석",
        description: "피트니스 업계 블루오션 키워드 자동 발굴",
      },
      {
        icon: BarChart3,
        title: "블로그 지수 분석",
        description: "내 블로그 최적화 상태 및 검색 순위 추적",
      },
    ],
  },
  {
    id: "network",
    name: "블로그 네트워크",
    description: "피트니스 블로거 네트워킹 자동화",
    color: "bg-blue-500",
    isNew: true,
    features: [
      {
        icon: Users,
        title: "서로이웃 자동화",
        description: "피트니스 블로거 자동 탐색 및 서로이웃 신청",
        isNew: true,
      },
      {
        icon: Heart,
        title: "좋아요/댓글 자동화",
        description: "AI 기반 맞춤 공감 및 댓글 자동 생성",
        isNew: true,
      },
      {
        icon: Target,
        title: "블로그 카르텔",
        description: "피트니스 블로거들의 상호 성장 네트워크",
        isNew: true,
      },
    ],
  },
  {
    id: "content",
    name: "콘텐츠 제작",
    description: "피트니스 전문 콘텐츠 자동 생성",
    color: "bg-purple-500",
    features: [
      {
        icon: ImagePlus,
        title: "비포애프터 제작",
        description: "회원 변화 비교 이미지 전문 템플릿으로 자동 제작",
      },
      {
        icon: LayoutGrid,
        title: "카드뉴스 디자인",
        description: "운동 가이드, 건강 정보 카드뉴스 자동 생성",
      },
      {
        icon: BookOpen,
        title: "운동 칼럼 작성",
        description: "의학적/과학적 근거가 포함된 전문 칼럼",
      },
    ],
  },
  {
    id: "member",
    name: "회원 관리",
    description: "PT 회원 맞춤 프로그램",
    color: "bg-amber-500",
    features: [
      {
        icon: Dumbbell,
        title: "PT 프로그램 빌더",
        description: "회원 목표별 맞춤 운동 프로그램 자동 생성",
      },
      {
        icon: UserCheck,
        title: "회원 상담 도우미",
        description: "체형 분석, 목표 설정 상담 스크립트 생성",
      },
    ],
  },
  {
    id: "analysis",
    name: "경쟁 분석",
    description: "주변 센터 마케팅 파악",
    color: "bg-red-500",
    features: [
      {
        icon: TrendingUp,
        title: "경쟁사 분석기",
        description: "주변 피트니스 센터 블로그/마케팅 전략 분석",
      },
      {
        icon: Megaphone,
        title: "네이버 플레이스 분석",
        description: "지역 내 경쟁 센터 순위 및 리뷰 분석",
      },
    ],
  },
  {
    id: "sns",
    name: "SNS 마케팅",
    description: "인스타그램/유튜브 콘텐츠",
    color: "bg-pink-500",
    features: [
      {
        icon: Instagram,
        title: "인스타 콘텐츠",
        description: "피트니스 특화 릴스/피드 콘텐츠 기획",
      },
      {
        icon: Palette,
        title: "썸네일 제작",
        description: "유튜브/인스타 썸네일 자동 디자인",
      },
    ],
  },
];

export function Features() {
  return (
    <section id="features" className="py-16 sm:py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <Badge variant="secondary" className="mb-3 sm:mb-4 text-xs sm:text-sm">
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5" />
            피트니스 전용 AI 도구
          </Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight mb-3 sm:mb-4">
            일반 AI에는 없는
            <br />
            <span className="text-primary">피트니스 전문 기능</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-sm sm:max-w-2xl mx-auto leading-relaxed">
            PT, 필라테스, 요가 업계의
            <br className="sm:hidden" />
            특수한 니즈를 이해하는
            <br />
            <span className="font-semibold text-foreground">24가지 전문 AI 도구</span>를 제공합니다.
          </p>
        </motion.div>

        <div className="space-y-4 sm:space-y-6">
          {categories.map((category, categoryIndex) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              className="bg-muted/30 rounded-xl sm:rounded-2xl p-4 sm:p-6"
            >
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full ${category.color}`} />
                <h3 className="font-semibold text-sm sm:text-base md:text-lg">
                  {category.name}
                  {category.isNew && (
                    <Badge className="ml-1.5 sm:ml-2 text-[10px] sm:text-xs py-0" variant="default">NEW</Badge>
                  )}
                </h3>
                <span className="text-xs sm:text-sm text-muted-foreground hidden sm:inline">
                  {category.description}
                </span>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
                {category.features.map((feature, featureIndex) => (
                  <div
                    key={featureIndex}
                    className="bg-background rounded-lg sm:rounded-xl p-3 sm:p-4 border hover:border-primary/30 transition-colors group"
                  >
                    <div className="flex items-start gap-2.5 sm:gap-3">
                      <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg ${category.color}/10 flex items-center justify-center flex-shrink-0`}>
                        <feature.icon className={`w-4 h-4 sm:w-5 sm:h-5 text-${category.color.replace('bg-', '')}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-[13px] sm:text-sm mb-0.5 flex items-center gap-1.5">
                          {feature.title}
                          {feature.isNew && (
                            <span className="text-[9px] sm:text-[10px] text-primary font-normal">NEW</span>
                          )}
                        </h4>
                        <p className="text-[11px] sm:text-xs text-muted-foreground leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-8 sm:mt-12 text-center"
        >
          <p className="text-[13px] sm:text-sm text-muted-foreground">
            ChatGPT나 일반 AI 도구로는
            <br className="sm:hidden" />
            절대 만들 수 없는
            <br className="sm:hidden" />
            <span className="text-foreground font-semibold"> 피트니스 전문 결과물</span>을 경험하세요.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
