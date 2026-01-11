import { NextRequest, NextResponse } from "next/server";

const TOSS_SECRET_KEY = process.env.TOSS_SECRET_KEY!;

export async function POST(request: NextRequest) {
  try {
    const { orderId, paymentKey, amount } = await request.json();

    if (!orderId || !paymentKey || !amount) {
      return NextResponse.json(
        { error: "필수 파라미터가 누락되었습니다." },
        { status: 400 }
      );
    }

    // 토스페이먼츠 결제 승인 API 호출
    const response = await fetch(
      "https://api.tosspayments.com/v1/payments/confirm",
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${Buffer.from(TOSS_SECRET_KEY + ":").toString("base64")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId,
          paymentKey,
          amount,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("토스페이먼츠 결제 승인 실패:", data);
      return NextResponse.json(
        {
          error: data.message || "결제 승인에 실패했습니다.",
          code: data.code,
        },
        { status: response.status }
      );
    }

    // 결제 성공 - 여기서 DB에 결제 정보 저장 등의 후처리를 할 수 있음
    // 예: Firebase에 결제 정보 저장
    // await savePaymentToFirebase(data);

    return NextResponse.json({
      success: true,
      orderId: data.orderId,
      orderName: data.orderName,
      totalAmount: data.totalAmount,
      method: data.method,
      approvedAt: data.approvedAt,
      status: data.status,
    });
  } catch (error) {
    console.error("결제 확인 중 오류:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
