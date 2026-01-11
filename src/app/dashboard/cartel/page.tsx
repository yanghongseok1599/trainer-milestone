"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  ChevronRight,
  ArrowLeft,
  Users,
  Loader2,
  CheckCircle2,
} from "lucide-react";

interface JoinFormData {
  name: string;
  phone: string;
  blogUrl: string;
  introduction: string;
  reason: string;
  referralSource: string;
  referrer: string;
}

export default function CartelJoinPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<JoinFormData>({
    name: "",
    phone: "",
    blogUrl: "",
    introduction: "",
    reason: "",
    referralSource: "",
    referrer: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // 실제로는 API 호출
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-muted/30">
        <header className="border-b bg-background sticky top-0 z-50">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 h-14 flex items-center">
            <Button variant="ghost" size="sm" className="mr-2" asChild>
              <Link href="/dashboard">
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </Button>
            <div className="flex items-center gap-2 text-sm">
              <Link href="/dashboard" className="text-muted-foreground hover:text-foreground">
                대시보드
              </Link>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
              <span className="font-semibold">카르텔 가입</span>
            </div>
          </div>
        </header>

        <main className="max-w-2xl mx-auto px-4 sm:px-6 py-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <CheckCircle2 className="w-20 h-20 text-emerald-500 mx-auto mb-6" />
            <h1 className="text-2xl font-bold mb-3">가입 신청 완료!</h1>
            <p className="text-muted-foreground mb-8">
              카르텔 운영자의 승인을 기다려주세요.<br />
              승인 시 등록하신 연락처로 알림을 보내드립니다.
            </p>
            <div className="flex gap-3 justify-center">
              <Button variant="outline" className="rounded-full" asChild>
                <Link href="/dashboard">대시보드로 돌아가기</Link>
              </Button>
              <Button className="rounded-full" asChild>
                <Link href="/dashboard/cartel/intro">카르텔 소개 보기</Link>
              </Button>
            </div>
          </motion.div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="border-b bg-background sticky top-0 z-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 h-14 flex items-center">
          <Button variant="ghost" size="sm" className="mr-2" asChild>
            <Link href="/dashboard">
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </Button>
          <div className="flex items-center gap-2 text-sm">
            <Link href="/dashboard" className="text-muted-foreground hover:text-foreground">
              대시보드
            </Link>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <span className="font-semibold">카르텔 가입</span>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* 헤더 */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold mb-2">블로그 카르텔 가입 신청</h1>
            <p className="text-muted-foreground">
              피트니스 전문가들의 블로그 품앗이 네트워크에 참여하세요
            </p>
          </div>

          {/* 가입 양식 */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-background border rounded-xl p-6 space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name">이름 *</Label>
                <Input
                  id="name"
                  placeholder="홍길동"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">연락처 *</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="010-1234-5678"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  승인 결과를 알려드릴 연락처를 입력해주세요
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="blogUrl">내 블로그 URL *</Label>
                <Input
                  id="blogUrl"
                  type="url"
                  placeholder="https://blog.naver.com/..."
                  value={formData.blogUrl}
                  onChange={(e) => setFormData({ ...formData, blogUrl: e.target.value })}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  활동 중인 블로그 주소를 입력해주세요
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="introduction">자기소개 *</Label>
                <Textarea
                  id="introduction"
                  placeholder="운영 중인 센터, 전문 분야, 경력 등을 소개해주세요"
                  value={formData.introduction}
                  onChange={(e) => setFormData({ ...formData, introduction: e.target.value })}
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="reason">가입 동기</Label>
                <Textarea
                  id="reason"
                  placeholder="카르텔에 가입하려는 이유를 알려주세요 (선택)"
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="referralSource">경로</Label>
                <Input
                  id="referralSource"
                  placeholder="카르텔을 알게 된 경로 (예: 인스타그램, 블로그, 지인 소개 등)"
                  value={formData.referralSource}
                  onChange={(e) => setFormData({ ...formData, referralSource: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="referrer">추천인</Label>
                <Input
                  id="referrer"
                  placeholder="추천인이 있다면 이름을 입력해주세요 (선택)"
                  value={formData.referrer}
                  onChange={(e) => setFormData({ ...formData, referrer: e.target.value })}
                />
              </div>
            </div>

            <div className="bg-muted/50 rounded-xl p-4">
              <h3 className="font-medium text-sm mb-2">신청 안내</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• 가입 승인까지 시간이 소요될 수 있습니다</li>
                <li>• 블로그 활동이 없거나 부적절한 경우 거절될 수 있습니다</li>
                <li>• 승인 후 카르텔 챌린지에 참여하실 수 있습니다</li>
              </ul>
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                className="flex-1 rounded-full"
                asChild
              >
                <Link href="/dashboard">취소</Link>
              </Button>
              <Button
                type="submit"
                className="flex-1 rounded-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    신청 중...
                  </>
                ) : (
                  "가입 신청하기"
                )}
              </Button>
            </div>
          </form>
        </motion.div>
      </main>
    </div>
  );
}
