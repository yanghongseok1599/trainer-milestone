"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Check,
  Zap,
  Crown,
  Sparkles,
  Building2,
} from "lucide-react";

const plans = [
  {
    id: "free",
    name: "무료",
    monthlyPrice: 0,
    yearlyPrice: 0,
    description: "시작하기 좋은 기본 플랜",
    features: [
      "기본 대시보드 접근",
      "블로그 글쓰기 AI (월 5회)",
      "카르텔 1개 가입",
      "기본 분석 리포트",
    ],
    buttonText: "현재 플랜",
    disabled: true,
  },
  {
    id: "pro",
    name: "프로",
    monthlyPrice: 29000,
    yearlyPrice: 290000,
    description: "전문 트레이너를 위한 플랜",
    features: [
      "모든 무료 기능 포함",
      "블로그 글쓰기 AI (무제한)",
      "카르텔 3개 가입",
      "SNS 자동화 도구",
      "경쟁사 분석",
      "상세 통계 분석",
      "이메일 지원",
    ],
    buttonText: "프로 시작하기",
    isPopular: true,
    icon: Zap,
  },
  {
    id: "premium",
    name: "프리미엄",
    monthlyPrice: 59000,
    yearlyPrice: 590000,
    description: "모든 기능을 제한 없이",
    features: [
      "모든 프로 기능 포함",
      "카르텔 무제한 가입",
      "AI 자동 댓글",
      "실시간 카카오톡 알림",
      "우선 기능 노출",
      "1:1 전담 매니저",
      "API 접근",
    ],
    buttonText: "프리미엄 시작하기",
    icon: Crown,
  },
  {
    id: "enterprise",
    name: "엔터프라이즈",
    monthlyPrice: null,
    yearlyPrice: null,
    description: "대규모 센터/프랜차이즈용",
    features: [
      "모든 프리미엄 기능 포함",
      "다중 계정 관리",
      "전용 서버 환경",
      "맞춤형 기능 개발",
      "SLA 보장",
      "현장 교육 지원",
    ],
    buttonText: "문의하기",
    isEnterprise: true,
    icon: Building2,
  },
];

export default function PricingPage() {
  const router = useRouter();
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly");

  const handleSelectPlan = (planId: string, price: number) => {
    if (price === 0) return;

    const orderId = `sub_${planId}_${Date.now()}`;
    const period = billingPeriod === "yearly" ? "연간" : "월간";
    const planName = plans.find(p => p.id === planId)?.name;

    router.push(
      `/checkout?type=subscription&planId=${planId}&period=${billingPeriod}&amount=${price}&orderId=${orderId}&orderName=${encodeURIComponent(`트레이너 마일스톤 ${planName} ${period} 구독`)}`
    );
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="border-b bg-background sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center">
          <Button variant="ghost" size="sm" className="mr-4" asChild>
            <Link href="/">
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </Button>
          <span className="font-semibold">요금제</span>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Hero */}
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              <Sparkles className="w-3 h-3 mr-1" />
              요금제
            </Badge>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">
              당신에게 맞는 플랜을 선택하세요
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              모든 유료 플랜은 7일 무료 체험이 가능합니다.
              <br />
              언제든지 취소할 수 있습니다.
            </p>

            {/* Billing Toggle */}
            <div className="inline-flex items-center gap-2 bg-muted p-1 rounded-full">
              <button
                onClick={() => setBillingPeriod("monthly")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  billingPeriod === "monthly"
                    ? "bg-background shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                월간 결제
              </button>
              <button
                onClick={() => setBillingPeriod("yearly")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  billingPeriod === "yearly"
                    ? "bg-background shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                연간 결제
                <Badge variant="secondary" className="ml-2 bg-primary/10 text-primary">
                  2개월 무료
                </Badge>
              </button>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {plans.map((plan, index) => {
              const price = billingPeriod === "yearly" ? plan.yearlyPrice : plan.monthlyPrice;
              const Icon = plan.icon;

              return (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative bg-background border rounded-2xl p-6 flex flex-col ${
                    plan.isPopular ? "border-primary shadow-lg ring-1 ring-primary" : ""
                  }`}
                >
                  {plan.isPopular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="bg-primary">가장 인기</Badge>
                    </div>
                  )}

                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      {Icon && <Icon className="w-5 h-5 text-primary" />}
                      <h3 className="text-lg font-semibold">{plan.name}</h3>
                    </div>
                    <div className="flex items-baseline gap-1 mb-2">
                      {price !== null ? (
                        <>
                          <span className="text-3xl font-bold">
                            {price === 0 ? "무료" : `₩${price.toLocaleString()}`}
                          </span>
                          {price > 0 && (
                            <span className="text-muted-foreground text-sm">
                              /{billingPeriod === "yearly" ? "년" : "월"}
                            </span>
                          )}
                        </>
                      ) : (
                        <span className="text-2xl font-bold">맞춤 견적</span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{plan.description}</p>
                  </div>

                  <ul className="space-y-3 mb-6 flex-1">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm">
                        <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant={plan.isPopular ? "default" : "outline"}
                    className="w-full rounded-full"
                    disabled={plan.disabled}
                    onClick={() => {
                      if (plan.isEnterprise) {
                        window.location.href = "mailto:contact@trainermilestone.com";
                      } else if (price !== null && price > 0) {
                        handleSelectPlan(plan.id, price);
                      }
                    }}
                  >
                    {plan.buttonText}
                  </Button>
                </motion.div>
              );
            })}
          </div>

          {/* FAQ or Additional Info */}
          <div className="bg-background border rounded-2xl p-8 text-center">
            <h2 className="text-xl font-semibold mb-4">자주 묻는 질문</h2>
            <div className="grid md:grid-cols-2 gap-6 text-left max-w-3xl mx-auto">
              <div>
                <h3 className="font-medium mb-2">언제든지 취소할 수 있나요?</h3>
                <p className="text-sm text-muted-foreground">
                  네, 언제든지 구독을 취소할 수 있습니다. 취소 후에도 결제 기간 끝까지 서비스를 이용하실 수 있습니다.
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-2">결제 수단은 무엇이 있나요?</h3>
                <p className="text-sm text-muted-foreground">
                  신용카드, 체크카드, 계좌이체, 간편결제(카카오페이, 네이버페이 등)를 지원합니다.
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-2">플랜을 변경할 수 있나요?</h3>
                <p className="text-sm text-muted-foreground">
                  언제든지 상위 플랜으로 업그레이드하거나 하위 플랜으로 다운그레이드할 수 있습니다.
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-2">환불 정책은 어떻게 되나요?</h3>
                <p className="text-sm text-muted-foreground">
                  첫 결제 후 7일 이내에는 전액 환불이 가능합니다. 이후에는 일할 계산으로 환불됩니다.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
