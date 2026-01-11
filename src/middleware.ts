import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // Firebase 인증을 사용하므로 Supabase 미들웨어는 비활성화
  // 필요시 여기에 다른 미들웨어 로직 추가 가능
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
