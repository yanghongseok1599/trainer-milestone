"use client";

import { useEffect, useRef, useState } from "react";
import { loadTossPayments, TossPaymentsWidgets } from "@tosspayments/tosspayments-sdk";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface TossCheckoutProps {
  amount: number;
  orderName: string;
  orderId: string;
  customerEmail?: string;
  customerName?: string;
  successUrl: string;
  failUrl: string;
}

const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY!;

export default function TossCheckout({
  amount,
  orderName,
  orderId,
  customerEmail,
  customerName,
  successUrl,
  failUrl,
}: TossCheckoutProps) {
  const [widgets, setWidgets] = useState<TossPaymentsWidgets | null>(null);
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const paymentMethodRef = useRef<HTMLDivElement>(null);
  const agreementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function initTossPayments() {
      const tossPayments = await loadTossPayments(clientKey);
      const customerKey = customerEmail || `guest_${Date.now()}`;

      const widgetsInstance = tossPayments.widgets({
        customerKey,
      });

      setWidgets(widgetsInstance);
    }

    initTossPayments();
  }, [customerEmail]);

  useEffect(() => {
    async function renderWidgets() {
      if (!widgets || !paymentMethodRef.current || !agreementRef.current) return;

      await widgets.setAmount({
        currency: "KRW",
        value: amount,
      });

      await Promise.all([
        widgets.renderPaymentMethods({
          selector: "#payment-method",
          variantKey: "DEFAULT",
        }),
        widgets.renderAgreement({
          selector: "#agreement",
          variantKey: "AGREEMENT",
        }),
      ]);

      setReady(true);
    }

    renderWidgets();
  }, [widgets, amount]);

  const handlePayment = async () => {
    if (!widgets) return;

    setLoading(true);
    try {
      await widgets.requestPayment({
        orderId,
        orderName,
        successUrl,
        failUrl,
        customerEmail,
        customerName,
      });
    } catch (error) {
      console.error("결제 요청 실패:", error);
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div id="payment-method" ref={paymentMethodRef} className="min-h-[300px]" />
      <div id="agreement" ref={agreementRef} />
      <Button
        onClick={handlePayment}
        disabled={!ready || loading}
        className="w-full h-12 rounded-full text-base"
      >
        {loading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          `${amount.toLocaleString()}원 결제하기`
        )}
      </Button>
    </div>
  );
}
