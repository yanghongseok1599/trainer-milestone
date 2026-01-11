"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  ChevronRight,
  ArrowLeft,
  Heart,
  MessageCircle,
  Bookmark,
  Loader2,
  ExternalLink,
  AlertCircle,
  Search,
  FileText,
  X,
  Crown,
  Users,
} from "lucide-react";

const actionOptions = [
  { id: "like", label: "좋아요", icon: Heart, points: 1 },
  { id: "comment", label: "댓글", icon: MessageCircle, points: 2 },
  { id: "scrap", label: "스크랩", icon: Bookmark, points: 2 },
];

interface BlogPreview {
  title: string;
  thumbnail: string | null;
  description: string;
  siteName?: string | null;
  url?: string;
}

// Mock 데이터 - 실제로는 사용자 정보에서 가져옴
const isPremiumUser = true; // 프리미엄 사용자 여부
const myCartels = [
  { id: "1", name: "피트니스 트레이너 모임" },
  { id: "2", name: "서울 PT 블로거" },
  { id: "3", name: "헬스 유튜버 모임" },
];

export default function CreateMissionPage() {
  const params = useParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [blogUrl, setBlogUrl] = useState("");
  const [blogPreview, setBlogPreview] = useState<BlogPreview | null>(null);
  const [selectedActions, setSelectedActions] = useState<string[]>(["like"]);
  const [error, setError] = useState("");
  const [registerToAll, setRegisterToAll] = useState(false);

  const calculatePoints = () => {
    return selectedActions.reduce((total, actionId) => {
      const action = actionOptions.find((a) => a.id === actionId);
      return total + (action?.points || 0);
    }, 0);
  };

  const handleActionToggle = (actionId: string) => {
    setSelectedActions((prev) =>
      prev.includes(actionId)
        ? prev.filter((id) => id !== actionId)
        : [...prev, actionId]
    );
  };

  const fetchBlogPreview = async () => {
    if (!blogUrl.trim()) {
      setError("블로그 URL을 입력해주세요.");
      return;
    }

    // URL 유효성 검사
    try {
      new URL(blogUrl);
    } catch {
      setError("올바른 URL 형식이 아닙니다.");
      return;
    }

    setError("");
    setIsFetching(true);

    try {
      const response = await fetch("/api/og-fetch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: blogUrl }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "페이지 정보를 가져올 수 없습니다.");
        setIsFetching(false);
        return;
      }

      setBlogPreview({
        title: data.title,
        thumbnail: data.image,
        description: data.description,
        siteName: data.siteName,
        url: data.url,
      });
    } catch (err) {
      setError("페이지 정보를 가져오는 중 오류가 발생했습니다.");
    } finally {
      setIsFetching(false);
    }
  };

  const clearPreview = () => {
    setBlogPreview(null);
    setBlogUrl("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!blogUrl.trim()) {
      setError("블로그 URL을 입력해주세요.");
      return;
    }

    if (!blogPreview) {
      setError("URL을 입력하고 불러오기 버튼을 눌러주세요.");
      return;
    }

    if (selectedActions.length === 0) {
      setError("최소 1개 이상의 액션을 선택해주세요.");
      return;
    }

    setIsLoading(true);

    // 실제로는 API 호출
    await new Promise((resolve) => setTimeout(resolve, 1500));

    router.push(`/dashboard/cartel/${params.cartelId}`);
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="border-b bg-background sticky top-0 z-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 h-14 flex items-center">
          <Button variant="ghost" size="sm" className="mr-2" asChild>
            <Link href={`/dashboard/cartel/${params.cartelId}`}>
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </Button>
          <div className="flex items-center gap-2 text-sm">
            <Link href="/dashboard/cartel" className="text-muted-foreground hover:text-foreground">
              카르텔
            </Link>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <span className="font-semibold">미션 등록</span>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold mb-2">새 미션 등록</h1>
            <p className="text-muted-foreground">
              카르텔 멤버들에게 응원받고 싶은 블로그 글을 등록하세요
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {error}
              </div>
            )}

            <div className="bg-background border rounded-xl p-5 space-y-5">
              <div className="space-y-2">
                <Label htmlFor="blogUrl">블로그 URL</Label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Input
                      id="blogUrl"
                      type="url"
                      placeholder="https://blog.naver.com/..."
                      value={blogUrl}
                      onChange={(e) => {
                        setBlogUrl(e.target.value);
                        if (blogPreview) setBlogPreview(null);
                      }}
                      className="pr-10"
                      disabled={isFetching}
                    />
                    {blogUrl && !isFetching && (
                      <a
                        href={blogUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={fetchBlogPreview}
                    disabled={isFetching || !blogUrl.trim()}
                    className="shrink-0"
                  >
                    {isFetching ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <Search className="w-4 h-4 mr-2" />
                        불러오기
                      </>
                    )}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  네이버 블로그, 티스토리 등 블로그 글 URL을 입력하고 불러오기를 눌러주세요
                </p>
              </div>

              {/* 블로그 미리보기 */}
              {blogPreview && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border rounded-lg overflow-hidden"
                >
                  <div className="relative">
                    {blogPreview.thumbnail ? (
                      <img
                        src={blogPreview.thumbnail}
                        alt="블로그 썸네일"
                        className="w-full h-40 object-cover"
                      />
                    ) : (
                      <div className="w-full h-40 bg-muted flex items-center justify-center">
                        <FileText className="w-12 h-12 text-muted-foreground/30" />
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={clearPreview}
                      className="absolute top-2 right-2 w-8 h-8 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="p-4">
                    {blogPreview.siteName && (
                      <p className="text-xs text-muted-foreground mb-1">{blogPreview.siteName}</p>
                    )}
                    <h3 className="font-semibold mb-1 line-clamp-2">{blogPreview.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {blogPreview.description}
                    </p>
                  </div>
                </motion.div>
              )}
            </div>

            {/* 프리미엄: 전체 카르텔 등록 */}
            {isPremiumUser && myCartels.length > 1 && (
              <div className="bg-gradient-to-r from-amber-500/10 to-yellow-500/10 border border-amber-500/30 rounded-xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Crown className="w-5 h-5 text-amber-500" />
                    <span className="font-semibold">전체 카르텔 등록</span>
                    <Badge className="bg-amber-500 text-white text-xs">프리미엄</Badge>
                  </div>
                  <Switch
                    checked={registerToAll}
                    onCheckedChange={setRegisterToAll}
                  />
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  한 번의 등록으로 가입한 모든 카르텔에 미션이 자동 등록됩니다.
                </p>
                {registerToAll && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="bg-background/50 rounded-lg p-3"
                  >
                    <p className="text-xs text-muted-foreground mb-2">등록될 카르텔 ({myCartels.length}개)</p>
                    <div className="flex flex-wrap gap-2">
                      {myCartels.map((cartel) => (
                        <div
                          key={cartel.id}
                          className="flex items-center gap-1.5 bg-background border rounded-full px-3 py-1 text-xs"
                        >
                          <Users className="w-3 h-3 text-muted-foreground" />
                          {cartel.name}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            )}

            <div className="bg-background border rounded-xl p-5">
              <Label className="mb-4 block">요청할 액션</Label>
              <div className="space-y-3">
                {actionOptions.map((action) => (
                  <label
                    key={action.id}
                    className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${
                      selectedActions.includes(action.id)
                        ? "border-primary bg-primary/5"
                        : "hover:border-muted-foreground/30"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Checkbox
                        checked={selectedActions.includes(action.id)}
                        onCheckedChange={() => handleActionToggle(action.id)}
                      />
                      <div className="flex items-center gap-2">
                        <action.icon className="w-4 h-4" />
                        <span className="font-medium">{action.label}</span>
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      +{action.points}P
                    </span>
                  </label>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  완료 시 지급 포인트
                </span>
                <span className="font-semibold text-primary">
                  +{calculatePoints()}P
                </span>
              </div>
            </div>

            <div className="bg-muted/50 rounded-xl p-4">
              <h3 className="font-medium text-sm mb-2">미션 안내</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• 등록된 미션은 카르텔 멤버들에게 즉시 공유됩니다</li>
                <li>• 멤버들이 미션을 완료하면 포인트를 획득합니다</li>
                <li>• 허위 미션 등록 시 제재를 받을 수 있습니다</li>
              </ul>
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                className="flex-1 rounded-full"
                onClick={() => router.back()}
              >
                취소
              </Button>
              <Button
                type="submit"
                className="flex-1 rounded-full"
                disabled={isLoading || !blogPreview}
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "미션 등록"
                )}
              </Button>
            </div>
          </form>
        </motion.div>
      </main>
    </div>
  );
}
