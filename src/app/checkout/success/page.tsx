"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle, Loader2, ArrowRight } from "lucide-react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [paymentInfo, setPaymentInfo] = useState<{
    orderId: string;
    amount: number;
    orderName: string;
  } | null>(null);

  const orderId = searchParams.get("orderId");
  const paymentKey = searchParams.get("paymentKey");
  const amount = searchParams.get("amount");

  useEffect(() => {
    async function confirmPayment() {
      if (!orderId || !paymentKey || !amount) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("/api/payment/confirm", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            orderId,
            paymentKey,
            amount: parseInt(amount, 10),
          }),
        });

        const data = await response.json();

        if (response.ok) {
          setPaymentInfo({
            orderId: data.orderId,
            amount: data.totalAmount,
            orderName: data.orderName,
          });
        }
      } catch (error) {
        console.error("결제 확인 실패:", error);
      } finally {
        setLoading(false);
      }
    }

    confirmPayment();
  }, [orderId, paymentKey, amount]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">결제를 확인하고 있습니다...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-background border rounded-2xl p-8 text-center"
      >
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>

        <h1 className="text-2xl font-bold mb-2">결제가 완료되었습니다!</h1>
        <p className="text-muted-foreground mb-6">
          서비스를 이용해 주셔서 감사합니다.
        </p>

        {paymentInfo && (
          <div className="bg-muted/50 rounded-xl p-4 mb-6 text-left">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">주문번호</span>
                <span className="font-mono">{paymentInfo.orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">상품명</span>
                <span>{paymentInfo.orderName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">결제금액</span>
                <span className="font-semibold">
                  ₩{paymentInfo.amount.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-3">
          <Button className="w-full rounded-full" asChild>
            <Link href="/dashboard">
              대시보드로 이동
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
          <Button variant="outline" className="w-full rounded-full" asChild>
            <Link href="/">홈으로</Link>
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
