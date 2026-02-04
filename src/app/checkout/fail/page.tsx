"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { XCircle, RefreshCcw, Home, Loader2 } from "lucide-react";

function FailContent() {
  const searchParams = useSearchParams();

  const errorCode = searchParams.get("code") || "UNKNOWN_ERROR";
  const errorMessage = searchParams.get("message") || "결제 처리 중 오류가 발생했습니다.";
  const orderId = searchParams.get("orderId");

  const getErrorDescription = (code: string) => {
    const errorDescriptions: Record<string, string> = {
      PAY_PROCESS_CANCELED: "결제가 취소되었습니다.",
      PAY_PROCESS_ABORTED: "결제 처리가 중단되었습니다.",
      INVALID_CARD_COMPANY: "유효하지 않은 카드사입니다.",
      INVALID_CARD_NUMBER: "유효하지 않은 카드 번호입니다.",
      EXCEED_MAX_DAILY_PAYMENT_COUNT: "일일 결제 횟수를 초과했습니다.",
      EXCEED_MAX_PAYMENT_AMOUNT: "결제 한도를 초과했습니다.",
      NOT_SUPPORTED_INSTALLMENT_PLAN: "지원하지 않는 할부 개월입니다.",
      INVALID_STOPPED_CARD: "정지된 카드입니다.",
      EXCEED_MAX_AMOUNT: "거래 금액 한도를 초과했습니다.",
      INVALID_CARD_LOST_OR_STOLEN: "분실/도난 카드입니다.",
      RESTRICTED_TRANSFER_ACCOUNT: "이체 제한 계좌입니다.",
      INVALID_CARD_EXPIRATION: "카드 유효기간이 만료되었습니다.",
      REJECT_CARD_PAYMENT: "카드 결제가 거절되었습니다.",
      UNKNOWN_ERROR: "알 수 없는 오류가 발생했습니다.",
    };

    return errorDescriptions[code] || errorDescriptions.UNKNOWN_ERROR;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-background border rounded-2xl p-8 text-center"
      >
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <XCircle className="w-8 h-8 text-red-600" />
        </div>

        <h1 className="text-2xl font-bold mb-2">결제에 실패했습니다</h1>
        <p className="text-muted-foreground mb-6">
          {getErrorDescription(errorCode)}
        </p>

        <div className="bg-muted/50 rounded-xl p-4 mb-6 text-left">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">오류 코드</span>
              <span className="font-mono text-xs">{errorCode}</span>
            </div>
            {orderId && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">주문번호</span>
                <span className="font-mono text-xs">{orderId}</span>
              </div>
            )}
            <div className="pt-2 border-t">
              <span className="text-muted-foreground text-xs block">
                상세 메시지
              </span>
              <span className="text-xs">{errorMessage}</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <Button className="w-full rounded-full" asChild>
            <Link href="/pricing">
              <RefreshCcw className="w-4 h-4 mr-2" />
              다시 시도하기
            </Link>
          </Button>
          <Button variant="outline" className="w-full rounded-full" asChild>
            <Link href="/">
              <Home className="w-4 h-4 mr-2" />
              홈으로
            </Link>
          </Button>
        </div>

        <p className="text-xs text-muted-foreground mt-6">
          문제가 계속되면{" "}
          <a href="mailto:info@trainer_milestone.com" className="underline">
            고객센터
          </a>
          로 문의해주세요.
        </p>
      </motion.div>
    </div>
  );
}

export default function PaymentFailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      }
    >
      <FailContent />
    </Suspense>
  );
}
