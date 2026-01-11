"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Loader2, Mail } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        setError(error.message);
      } else {
        setSuccess(true);
      }
    } catch {
      setError("비밀번호 재설정 요청 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex flex-col">
        <header className="p-4 sm:p-6">
          <Link
            href="/login"
            className="inline-flex items-center text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            로그인으로 돌아가기
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
              <Mail className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-2">
              이메일을 확인해주세요
            </h1>
            <p className="text-sm text-muted-foreground mb-6">
              <span className="font-medium text-foreground">{email}</span>
              <br />
              으로 비밀번호 재설정 링크를 보냈습니다.
            </p>
            <Button
              variant="outline"
              className="rounded-full"
              asChild
            >
              <Link href="/login">로그인 페이지로 이동</Link>
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
          href="/login"
          className="inline-flex items-center text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          로그인으로 돌아가기
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
              비밀번호 찾기
            </h1>
            <p className="text-sm text-muted-foreground">
              가입한 이메일을 입력하세요
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
                {error}
              </div>
            )}

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

            <Button
              type="submit"
              className="w-full h-11 rounded-full mt-6"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "비밀번호 재설정 링크 보내기"
              )}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            비밀번호가 기억나셨나요?{" "}
            <Link
              href="/login"
              className="text-foreground hover:underline font-medium"
            >
              로그인
            </Link>
          </p>
        </motion.div>
      </main>
    </div>
  );
}
