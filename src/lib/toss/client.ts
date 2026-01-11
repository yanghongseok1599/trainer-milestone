import { loadTossPayments } from "@tosspayments/tosspayments-sdk";

const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY!;

export async function getTossPayments() {
  const tossPayments = await loadTossPayments(clientKey);
  return tossPayments;
}

export { clientKey };
