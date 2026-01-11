"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Loader2, CheckCircle } from "lucide-react";
import { auth, googleProvider } from "@/lib/firebase/client";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";

export default function SignupPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (password.length < 6) {
      setError("비밀번호는 6자 이상이어야 합니다.");
      return;
    }

    setIsLoading(true);

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setSuccess(true);
    } catch (err: unknown) {
      const errorCode = (err as { code?: string })?.code;
      if (errorCode === "auth/email-already-in-use") {
        setError("이미 등록된 이메일입니다.");
      } else if (errorCode === "auth/invalid-email") {
        setError("유효하지 않은 이메일 형식입니다.");
      } else if (errorCode === "auth/weak-password") {
        setError("비밀번호가 너무 약합니다. 6자 이상 입력해주세요.");
      } else {
        setError("회원가입 중 오류가 발생했습니다.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setError("");
    setIsGoogleLoading(true);

    try {
      await signInWithPopup(auth, googleProvider);
      router.push("/dashboard");
      router.refresh();
    } catch (err: unknown) {
      const errorCode = (err as { code?: string })?.code;
      if (errorCode === "auth/popup-closed-by-user") {
        setError("가입이 취소되었습니다.");
      } else if (errorCode === "auth/popup-blocked") {
        setError("팝업이 차단되었습니다. 팝업 차단을 해제해주세요.");
      } else {
        setError("구글 가입 중 오류가 발생했습니다.");
      }
    } finally {
      setIsGoogleLoading(false);
    }
  };

  if (success) {
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
            className="w-full max-w-sm text-center"
          >
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-2">
              회원가입 완료
            </h1>
            <p className="text-sm text-muted-foreground mb-6">
              <span className="font-medium text-foreground">{email}</span>
              <br />
              계정이 생성되었습니다.
            </p>
            <Button
              className="rounded-full"
              onClick={() => router.push("/dashboard")}
            >
              대시보드로 이동
            </Button>
          </motion.div>
        </main>
      </div>
    );
  }

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
              회원가입
            </h1>
            <p className="text-sm text-muted-foreground">
              30일 무료 체험을 시작하세요
            </p>
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm mb-4">
              {error}
            </div>
          )}

          <Button
            type="button"
            variant="outline"
            className="w-full h-11 rounded-lg mb-6"
            onClick={handleGoogleSignup}
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
                Google로 가입하기
              </>
            )}
          </Button>

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
                이메일
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-11 rounded-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm">
                비밀번호
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="6자 이상 입력하세요"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="h-11 rounded-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm">
                비밀번호 확인
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="비밀번호를 다시 입력하세요"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
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
                "회원가입"
              )}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            이미 계정이 있으신가요?{" "}
            <Link
              href="/login"
              className="text-foreground hover:underline font-medium"
            >
              로그인
            </Link>
          </p>

          <p className="text-center text-[10px] sm:text-xs text-muted-foreground mt-8 px-4">
            회원가입 시{" "}
            <Link href="#" className="underline">
              이용약관
            </Link>{" "}
            및{" "}
            <Link href="#" className="underline">
              개인정보처리방침
            </Link>
            에 동의하게 됩니다.
          </p>
        </motion.div>
      </main>
    </div>
  );
}
