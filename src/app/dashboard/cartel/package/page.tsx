"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ChevronRight,
  ArrowLeft,
  Crown,
  Zap,
  Rocket,
  Shield,
  Users,
  Target,
  BarChart3,
  Bell,
  MessageCircle,
  Star,
  Check,
  ExternalLink,
  Sparkles,
} from "lucide-react";

const packages = [
  {
    id: "basic",
    name: "베이직",
    price: "무료",
    priceValue: 0,
    description: "카르텔 기본 기능을 체험해보세요",
    features: [
      "카르텔 1개 가입",
      "일 3회 미션 등록",
      "기본 포인트 적립",
      "미션 피드 조회",
    ],
    buttonText: "현재 플랜",
    buttonVariant: "outline" as const,
    isCurrent: true,
  },
  {
    id: "pro",
    name: "프로",
    price: "₩29,000",
    priceValue: 29000,
    period: "/월",
    description: "활발한 블로그 활동을 위한 플랜",
    features: [
      "카르텔 3개 가입",
      "무제한 미션 등록",
      "2배 포인트 적립",
      "미션 우선 노출",
      "상세 통계 분석",
      "이메일 알림",
    ],
    buttonText: "프로 시작하기",
    buttonVariant: "default" as const,
    isPopular: true,
  },
  {
    id: "premium",
    name: "프리미엄",
    price: "₩59,000",
    priceValue: 59000,
    period: "/월",
    description: "전문가를 위한 올인원 패키지",
    features: [
      "카르텔 무제한 가입",
      "무제한 미션 등록",
      "전체 카르텔 미션 일괄 등록",
      "3배 포인트 적립",
      "미션 최상위 노출",
      "AI 댓글 자동 생성",
      "실시간 카카오톡 알림",
      "1:1 전담 매니저",
      "카르텔 생성 무제한",
    ],
    buttonText: "프리미엄 시작하기",
    buttonVariant: "default" as const,
  },
];

const banners = [
  {
    id: "bulk-mission",
    title: "전체 카르텔 미션 일괄 등록",
    description: "한 번의 등록으로 가입한 모든 카르텔에 미션을 자동으로 등록하세요",
    icon: Users,
    color: "from-amber-500 to-orange-500",
    href: "/dashboard/cartel/1/mission/create",
    badge: "프리미엄 전용",
  },
  {
    id: "blog-boost",
    title: "블로그 지수 부스터",
    description: "AI가 분석한 최적의 키워드로 블로그 지수를 빠르게 올려보세요",
    icon: Rocket,
    color: "from-blue-500 to-cyan-500",
    href: "/dashboard",
    badge: "인기",
  },
  {
    id: "auto-comment",
    title: "AI 자동 댓글",
    description: "자연스러운 AI 댓글로 시간을 절약하세요",
    icon: MessageCircle,
    color: "from-purple-500 to-pink-500",
    href: "/dashboard",
    badge: "NEW",
  },
  {
    id: "competitor",
    title: "경쟁사 분석기",
    description: "주변 센터의 마케팅 전략을 실시간으로 파악하세요",
    icon: Target,
    color: "from-orange-500 to-red-500",
    href: "/dashboard",
  },
  {
    id: "analytics",
    title: "상세 통계 분석",
    description: "미션 완료율, 포인트 추이 등 상세 데이터를 확인하세요",
    icon: BarChart3,
    color: "from-emerald-500 to-teal-500",
    href: "/dashboard",
  },
  {
    id: "notification",
    title: "실시간 알림 서비스",
    description: "새 미션, 댓글 알림을 카카오톡으로 받아보세요",
    icon: Bell,
    color: "from-yellow-500 to-orange-500",
    href: "/dashboard",
    badge: "프리미엄",
  },
  {
    id: "vip-network",
    title: "VIP 네트워크",
    description: "검증된 인플루언서들과 특별한 네트워크를 형성하세요",
    icon: Crown,
    color: "from-amber-500 to-yellow-500",
    href: "/dashboard",
    badge: "프리미엄",
  },
];

const benefits = [
  {
    icon: Users,
    title: "네트워크 확장",
    description: "더 많은 카르텔에 가입하여 네트워크를 넓히세요",
  },
  {
    icon: Zap,
    title: "빠른 성장",
    description: "프리미엄 기능으로 블로그를 빠르게 성장시키세요",
  },
  {
    icon: Shield,
    title: "우선 지원",
    description: "문제 발생 시 우선적으로 지원받으세요",
  },
  {
    icon: Star,
    title: "독점 기능",
    description: "프리미엄 전용 기능을 먼저 사용해보세요",
  },
];

export default function CartelPackagePage() {
  const router = useRouter();

  const handleSelectPackage = (pkgId: string, price: number, name: string) => {
    if (price === 0) return;

    const orderId = `cartel_${pkgId}_${Date.now()}`;
    router.push(
      `/checkout?type=cartel&planId=${pkgId}&amount=${price}&orderId=${orderId}&orderName=${encodeURIComponent(`카르텔 ${name} 패키지`)}`
    );
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="border-b bg-background sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center">
          <Button variant="ghost" size="sm" className="mr-2" asChild>
            <Link href="/dashboard/cartel">
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </Button>
          <div className="flex items-center gap-2 text-sm">
            <Link href="/dashboard" className="text-muted-foreground hover:text-foreground">
              대시보드
            </Link>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <Link href="/dashboard/cartel" className="text-muted-foreground hover:text-foreground">
              카르텔
            </Link>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <span className="font-semibold">패키지</span>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Hero */}
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              <Sparkles className="w-3 h-3 mr-1" />
              카르텔 패키지
            </Badge>
            <h1 className="text-3xl font-bold mb-4">
              더 강력한 블로그 성장을 위한 패키지
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              프리미엄 기능으로 블로그 마케팅을 한 단계 업그레이드하세요.
              <br />
              더 많은 카르텔, 더 빠른 성장, 더 스마트한 자동화.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative bg-background border rounded-2xl p-6 ${
                  pkg.isPopular ? "border-primary shadow-lg scale-105" : ""
                }`}
              >
                {pkg.isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary">가장 인기</Badge>
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className="text-lg font-semibold mb-2">{pkg.name}</h3>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-3xl font-bold">{pkg.price}</span>
                    {pkg.period && (
                      <span className="text-muted-foreground text-sm">{pkg.period}</span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    {pkg.description}
                  </p>
                </div>
                <ul className="space-y-3 mb-6">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  variant={pkg.buttonVariant}
                  className="w-full rounded-full"
                  disabled={pkg.isCurrent}
                  onClick={() => handleSelectPackage(pkg.id, pkg.priceValue, pkg.name)}
                >
                  {pkg.buttonText}
                </Button>
              </motion.div>
            ))}
          </div>

          {/* Benefits */}
          <div className="mb-16">
            <h2 className="text-xl font-semibold text-center mb-8">
              프리미엄 혜택
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
              {benefits.map((benefit) => (
                <div
                  key={benefit.title}
                  className="bg-background border rounded-xl p-5 text-center"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <benefit.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-medium mb-1">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Link Banners */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-center mb-8">
              프리미엄 기능 둘러보기
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {banners.map((banner, index) => (
                <motion.div
                  key={banner.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Link
                    href={banner.href}
                    className="group block relative overflow-hidden rounded-xl border bg-background hover:shadow-md transition-all"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${banner.color} opacity-5 group-hover:opacity-10 transition-opacity`} />
                    <div className="relative p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${banner.color} flex items-center justify-center`}>
                          <banner.icon className="w-5 h-5 text-white" />
                        </div>
                        {banner.badge && (
                          <Badge variant="secondary" className="text-xs">
                            {banner.badge}
                          </Badge>
                        )}
                      </div>
                      <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                        {banner.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        {banner.description}
                      </p>
                      <div className="flex items-center text-sm text-primary font-medium">
                        자세히 보기
                        <ExternalLink className="w-3 h-3 ml-1" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-2xl p-8 text-center">
            <Crown className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">
              지금 업그레이드하고 블로그를 성장시키세요
            </h2>
            <p className="text-muted-foreground mb-6">
              첫 달 50% 할인 프로모션 진행 중!
            </p>
            <div className="flex gap-3 justify-center">
              <Button variant="outline" className="rounded-full" asChild>
                <Link href="/dashboard/cartel">카르텔 둘러보기</Link>
              </Button>
              <Button
                className="rounded-full"
                onClick={() => handleSelectPackage("pro", 29000, "프로")}
              >
                <Zap className="w-4 h-4 mr-2" />
                프로 시작하기
              </Button>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
