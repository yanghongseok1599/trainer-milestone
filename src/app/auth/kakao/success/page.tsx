"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";

function KakaoSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const userParam = searchParams.get("user");

    if (userParam) {
      try {
        const user = JSON.parse(decodeURIComponent(userParam));

        // 카카오 사용자 정보 저장
        localStorage.setItem("isKakaoLoggedIn", "true");
        localStorage.setItem("kakaoUser", JSON.stringify(user));

        // 대시보드로 이동
        router.push("/dashboard");
        router.refresh();
      } catch (error) {
        console.error("Failed to parse user data:", error);
        router.push("/login?error=parse_failed");
      }
    } else {
      router.push("/login?error=no_user_data");
    }
  }, [searchParams, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
        <p className="text-muted-foreground">로그인 처리 중...</p>
      </div>
    </div>
  );
}

export default function KakaoSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
            <p className="text-muted-foreground">로딩 중...</p>
          </div>
        </div>
      }
    >
      <KakaoSuccessContent />
    </Suspense>
  );
}
