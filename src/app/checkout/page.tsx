"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CreditCard, Shield, Lock } from "lucide-react";
import TossCheckout from "@/components/payment/TossCheckout";

function CheckoutContent() {
  const searchParams = useSearchParams();

  const type = searchParams.get("type") || "subscription";
  const planId = searchParams.get("planId") || "";
  const period = searchParams.get("period") || "monthly";
  const amount = parseInt(searchParams.get("amount") || "0", 10);
  const orderId = searchParams.get("orderId") || `order_${Date.now()}`;
  const orderName = searchParams.get("orderName") || "트레이너 마일스톤 결제";

  const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
  const successUrl = `${baseUrl}/checkout/success?orderId=${orderId}`;
  const failUrl = `${baseUrl}/checkout/fail?orderId=${orderId}`;

  const getPlanDetails = () => {
    if (type === "cartel") {
      const cartelPlans: Record<string, { name: string; description: string }> = {
        pro: { name: "카르텔 프로", description: "활발한 블로그 활동을 위한 플랜" },
        premium: { name: "카르텔 프리미엄", description: "전문가를 위한 올인원 패키지" },
      };
      return cartelPlans[planId] || { name: "카르텔 패키지", description: "" };
    }

    const subscriptionPlans: Record<string, { name: string; description: string }> = {
      pro: { name: "프로", description: "전문 트레이너를 위한 플랜" },
      premium: { name: "프리미엄", description: "모든 기능을 제한 없이" },
    };
    return subscriptionPlans[planId] || { name: "구독", description: "" };
  };

  const planDetails = getPlanDetails();

  if (amount === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">잘못된 결제 요청입니다.</p>
          <Button asChild>
            <Link href="/">홈으로 돌아가기</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="border-b bg-background sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-14 flex items-center">
          <Button variant="ghost" size="sm" className="mr-4" asChild>
            <Link href={type === "cartel" ? "/dashboard/cartel/package" : "/pricing"}>
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </Button>
          <span className="font-semibold">결제</span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <div className="bg-background border rounded-2xl p-6 sticky top-24">
              <h2 className="font-semibold mb-4">주문 요약</h2>

              <div className="border-b pb-4 mb-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{planDetails.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {type === "subscription"
                        ? period === "yearly"
                          ? "연간 구독"
                          : "월간 구독"
                        : "일회성 결제"}
                    </p>
                  </div>
                </div>
                {planDetails.description && (
                  <p className="text-sm text-muted-foreground mt-2">
                    {planDetails.description}
                  </p>
                )}
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">상품 금액</span>
                  <span>₩{amount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">할인</span>
                  <span className="text-green-600">₩0</span>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between font-semibold">
                  <span>총 결제 금액</span>
                  <span className="text-primary">₩{amount.toLocaleString()}</span>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
                <Shield className="w-4 h-4" />
                <span>안전한 결제가 보장됩니다</span>
              </div>
            </div>
          </motion.div>

          {/* Payment Methods */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <div className="bg-background border rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-6">
                <Lock className="w-5 h-5 text-muted-foreground" />
                <h2 className="font-semibold">결제 수단 선택</h2>
                <Badge variant="secondary" className="ml-auto">
                  토스페이먼츠
                </Badge>
              </div>

              <TossCheckout
                amount={amount}
                orderName={decodeURIComponent(orderName)}
                orderId={orderId}
                successUrl={successUrl}
                failUrl={failUrl}
              />

              <p className="text-xs text-muted-foreground text-center mt-4">
                결제 진행 시 서비스 이용약관 및 개인정보처리방침에 동의하게 됩니다.
              </p>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}
