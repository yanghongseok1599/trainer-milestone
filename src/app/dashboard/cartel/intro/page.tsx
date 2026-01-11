"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  ArrowLeft,
  Users,
  Heart,
  MessageCircle,
  Bookmark,
  Trophy,
  Target,
  Zap,
  Shield,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";

const features = [
  {
    icon: Users,
    title: "블로거 네트워크",
    description: "같은 분야의 블로거들과 함께 성장하는 커뮤니티입니다.",
  },
  {
    icon: Heart,
    title: "상호 좋아요",
    description: "서로의 블로그 글에 좋아요를 눌러 응원합니다.",
  },
  {
    icon: MessageCircle,
    title: "댓글 교환",
    description: "의미 있는 댓글로 블로그 활성화를 돕습니다.",
  },
  {
    icon: Bookmark,
    title: "스크랩 공유",
    description: "좋은 콘텐츠를 스크랩하여 확산시킵니다.",
  },
];

const benefits = [
  {
    icon: TrendingUp,
    title: "블로그 지수 상승",
    description: "꾸준한 상호작용으로 블로그 최적화 지수가 올라갑니다.",
  },
  {
    icon: Target,
    title: "검색 노출 증가",
    description: "활발한 활동으로 네이버 검색 상위 노출 확률이 높아집니다.",
  },
  {
    icon: Trophy,
    title: "포인트 적립",
    description: "미션 완료 시 포인트를 획득하고 혜택을 받을 수 있습니다.",
  },
  {
    icon: Shield,
    title: "신뢰 네트워크",
    description: "검증된 멤버들과 안전하게 품앗이 활동을 합니다.",
  },
];

const howItWorks = [
  {
    step: 1,
    title: "카르텔 가입",
    description: "관심 분야의 카르텔에 가입하거나 직접 만들어보세요.",
  },
  {
    step: 2,
    title: "미션 등록",
    description: "응원받고 싶은 블로그 글을 미션으로 등록합니다.",
  },
  {
    step: 3,
    title: "미션 수행",
    description: "다른 멤버의 미션을 확인하고 좋아요/댓글/스크랩을 수행합니다.",
  },
  {
    step: 4,
    title: "포인트 획득",
    description: "미션 완료 시 포인트를 획득하고 랭킹에 반영됩니다.",
  },
];

export default function CartelIntroPage() {
  return (
    <div className="min-h-screen bg-muted/30">
      <header className="border-b bg-background sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-14 flex items-center">
          <Button variant="ghost" size="sm" className="mr-2" asChild>
            <Link href="/dashboard">
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </Button>
          <div className="flex items-center gap-2 text-sm">
            <Link href="/dashboard" className="text-muted-foreground hover:text-foreground">
              대시보드
            </Link>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <span className="font-semibold">카르텔 소개</span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Hero */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-3xl font-bold mb-4">블로그 카르텔</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              피트니스 전문가들의 블로그 품앗이 네트워크입니다.<br />
              서로의 콘텐츠를 응원하고, 함께 성장하세요.
            </p>
          </div>

          {/* Features */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold mb-6 text-center">카르텔 활동</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="bg-background border rounded-xl p-4 text-center"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-medium mb-1">{feature.title}</h3>
                  <p className="text-xs text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* How it works */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold mb-6 text-center">이용 방법</h2>
            <div className="bg-background border rounded-xl p-6">
              <div className="grid md:grid-cols-4 gap-6">
                {howItWorks.map((item, index) => (
                  <div key={item.step} className="relative">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                        {item.step}
                      </div>
                      <h3 className="font-medium">{item.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground pl-11">
                      {item.description}
                    </p>
                    {index < howItWorks.length - 1 && (
                      <ChevronRight className="hidden md:block absolute top-2 -right-3 w-5 h-5 text-muted-foreground" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold mb-6 text-center">카르텔 혜택</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {benefits.map((benefit) => (
                <div
                  key={benefit.title}
                  className="bg-background border rounded-xl p-5 flex items-start gap-4"
                >
                  <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="w-5 h-5 text-emerald-500" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Rules */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold mb-6 text-center">이용 규칙</h2>
            <div className="bg-background border rounded-xl p-6">
              <ul className="space-y-3">
                {[
                  "미션은 24시간 이내에 수행해야 합니다.",
                  "허위 완료 신고 시 경고 및 제재를 받을 수 있습니다.",
                  "한 카르텔당 최대 20명까지 참여 가능합니다.",
                  "주 3회 이상 미션 미수행 시 자동 경고됩니다.",
                  "부적절한 콘텐츠 등록 시 즉시 퇴출됩니다.",
                ].map((rule, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-8 text-center">
            <Zap className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">지금 시작하세요!</h2>
            <p className="text-muted-foreground mb-6">
              카르텔에 가입하고 블로그 성장을 경험해보세요.
            </p>
            <div className="flex gap-3 justify-center">
              <Button variant="outline" className="rounded-full" asChild>
                <Link href="/dashboard/cartel">카르텔 둘러보기</Link>
              </Button>
              <Button className="rounded-full" asChild>
                <Link href="/dashboard/cartel/create">카르텔 만들기</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
