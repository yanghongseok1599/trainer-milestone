"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Loader2 } from "lucide-react";
import { auth, googleProvider } from "@/lib/firebase/client";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isKakaoLoading, setIsKakaoLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // 관리자 계정 정보
  const ADMIN_ID = "ccv5";
  const ADMIN_PASSWORD = "3412";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // 관리자 계정 확인
    if (email.trim() === ADMIN_ID) {
      if (password === ADMIN_PASSWORD) {
        localStorage.setItem("isAdminLoggedIn", "true");
        localStorage.setItem("adminUser", JSON.stringify({ id: ADMIN_ID, role: "admin" }));
        router.push("/dashboard");
        router.refresh();
        return;
      } else {
        setError("아이디 또는 비밀번호가 올바르지 않습니다.");
        setIsLoading(false);
        return;
      }
    }

    // Firebase 로그인 시도
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
      router.refresh();
    } catch (err: unknown) {
      const errorCode = (err as { code?: string })?.code;
      if (errorCode === "auth/invalid-email") {
        setError("유효하지 않은 이메일 형식입니다.");
      } else if (errorCode === "auth/user-not-found") {
        setError("등록되지 않은 이메일입니다.");
      } else if (errorCode === "auth/wrong-password" || errorCode === "auth/invalid-credential") {
        setError("아이디 또는 비밀번호가 올바르지 않습니다.");
      } else {
        setError("로그인 중 오류가 발생했습니다.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setIsGoogleLoading(true);

    try {
      await signInWithPopup(auth, googleProvider);
      router.push("/dashboard");
      router.refresh();
    } catch (err: unknown) {
      const errorCode = (err as { code?: string })?.code;
      if (errorCode === "auth/popup-closed-by-user") {
        setError("로그인이 취소되었습니다.");
      } else if (errorCode === "auth/popup-blocked") {
        setError("팝업이 차단되었습니다. 팝업 차단을 해제해주세요.");
      } else {
        setError("구글 로그인 중 오류가 발생했습니다.");
      }
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleKakaoLogin = () => {
    setError("");
    setIsKakaoLoading(true);

    const KAKAO_REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;
    const REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;

    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

    window.location.href = kakaoAuthUrl;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-4 sm:p-6">
        <Link
          href="/"
          className="inline-flex items-center text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          홈으로
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-sm"
        >
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-2">
              로그인
            </h1>
            <p className="text-sm text-muted-foreground">
              계정에 로그인하세요
            </p>
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm mb-4">
              {error}
            </div>
          )}

          {/* 소셜 로그인 버튼들 */}
          <div className="space-y-3 mb-6">
            {/* 카카오 로그인 */}
            <Button
              type="button"
              variant="outline"
              className="w-full h-11 rounded-lg bg-[#FEE500] hover:bg-[#FEE500]/90 border-[#FEE500] text-[#000000]/85"
              onClick={handleKakaoLogin}
              disabled={isKakaoLoading}
            >
              {isKakaoLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 3C6.48 3 2 6.48 2 10.5c0 2.55 1.69 4.79 4.22 6.08-.18.65-.72 2.34-.82 2.7-.13.45.16.45.34.33.14-.1 2.19-1.49 3.08-2.1.38.05.77.08 1.18.08 5.52 0 10-3.02 10-6.5S17.52 3 12 3z"/>
                  </svg>
                  카카오로 계속하기
                </>
              )}
            </Button>

            {/* 구글 로그인 */}
            <Button
              type="button"
              variant="outline"
              className="w-full h-11 rounded-lg"
              onClick={handleGoogleLogin}
              disabled={isGoogleLoading}
            >
              {isGoogleLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Google로 계속하기
                </>
              )}
            </Button>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-muted"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">또는</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm">
                아이디 또는 이메일
              </Label>
              <Input
                id="email"
                type="text"
                placeholder="아이디 또는 이메일 입력"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-11 rounded-lg"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm">
                  비밀번호
                </Label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-muted-foreground hover:text-foreground"
                >
                  비밀번호 찾기
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="비밀번호를 입력하세요"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-11 rounded-lg"
              />
            </div>

            <Button
              type="submit"
              className="w-full h-11 rounded-full mt-6"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "로그인"
              )}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            계정이 없으신가요?{" "}
            <Link
              href="/signup"
              className="text-foreground hover:underline font-medium"
            >
              회원가입
            </Link>
          </p>
        </motion.div>
      </main>
    </div>
  );
}
