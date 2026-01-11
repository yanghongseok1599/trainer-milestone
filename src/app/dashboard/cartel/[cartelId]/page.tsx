"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChevronRight,
  Users,
  Crown,
  Plus,
  Heart,
  MessageCircle,
  Bookmark,
  ExternalLink,
  Clock,
  CheckCircle2,
  Settings,
  UserPlus,
  Trophy,
} from "lucide-react";

// Mock data - 실제로는 Supabase에서 가져옴
const cartelData = {
  id: "1",
  name: "피트니스 트레이너 모임",
  description: "피트니스 트레이너들의 블로그 품앗이 그룹입니다. 서로의 콘텐츠를 응원하고 성장해요!",
  members: 12,
  maxMembers: 20,
  myRole: "owner",
  myPoints: 45,
  createdAt: "2024-01-15",
};

const missions = [
  {
    id: "m1",
    type: "like",
    authorName: "헬스트레이너 민수",
    authorAvatar: null,
    title: "스쿼트 자세 교정 가이드",
    description: "올바른 스쿼트 자세로 무릎 부상 없이 하체 근력을 키우는 방법을 알려드립니다.",
    thumbnail: "https://picsum.photos/seed/squat/400/200",
    siteName: "네이버 블로그",
    url: "https://blog.naver.com/example1",
    createdAt: "10분 전",
    requiredActions: ["좋아요"],
    points: 1,
    completedBy: 5,
    totalMembers: 12,
    isCompleted: false,
  },
  {
    id: "m2",
    type: "comment",
    authorName: "PT 전문가 지영",
    authorAvatar: null,
    title: "다이어트 식단 구성 방법",
    description: "건강하게 체중을 감량할 수 있는 식단 구성법을 소개합니다.",
    thumbnail: "https://picsum.photos/seed/diet/400/200",
    siteName: "네이버 블로그",
    url: "https://blog.naver.com/example2",
    createdAt: "30분 전",
    requiredActions: ["좋아요", "댓글"],
    points: 3,
    completedBy: 8,
    totalMembers: 12,
    isCompleted: true,
  },
  {
    id: "m3",
    type: "scrap",
    authorName: "요가강사 수진",
    authorAvatar: null,
    title: "아침 스트레칭 루틴 5가지",
    description: "하루를 상쾌하게 시작하는 아침 스트레칭 루틴을 소개합니다.",
    thumbnail: "https://picsum.photos/seed/yoga/400/200",
    siteName: "티스토리",
    url: "https://blog.naver.com/example3",
    createdAt: "1시간 전",
    requiredActions: ["좋아요", "댓글", "스크랩"],
    points: 5,
    completedBy: 3,
    totalMembers: 12,
    isCompleted: false,
  },
];

const members = [
  { id: "u1", name: "헬스트레이너 민수", role: "owner", points: 120, completedMissions: 45 },
  { id: "u2", name: "PT 전문가 지영", role: "member", points: 98, completedMissions: 38 },
  { id: "u3", name: "요가강사 수진", role: "member", points: 85, completedMissions: 32 },
  { id: "u4", name: "필라테스 강사 혜원", role: "member", points: 72, completedMissions: 28 },
  { id: "u5", name: "크로스핏 코치 준혁", role: "member", points: 65, completedMissions: 25 },
];

const actionIcons: Record<string, React.ReactNode> = {
  "좋아요": <Heart className="w-3 h-3" />,
  "댓글": <MessageCircle className="w-3 h-3" />,
  "스크랩": <Bookmark className="w-3 h-3" />,
};

export default function CartelDetailPage() {
  const params = useParams();
  const [activeTab, setActiveTab] = useState("missions");
  const [completingMission, setCompletingMission] = useState<string | null>(null);

  const handleCompleteMission = async (missionId: string) => {
    setCompletingMission(missionId);
    // 실제로는 API 호출
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setCompletingMission(null);
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="border-b bg-background sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/dashboard" className="text-muted-foreground hover:text-foreground">
              대시보드
            </Link>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <Link href="/dashboard/cartel" className="text-muted-foreground hover:text-foreground">
              카르텔
            </Link>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <span className="font-semibold truncate max-w-[150px]">{cartelData.name}</span>
          </div>
          {cartelData.myRole === "owner" && (
            <Button variant="ghost" size="sm" asChild>
              <Link href={`/dashboard/cartel/${params.cartelId}/settings`}>
                <Settings className="w-4 h-4" />
              </Link>
            </Button>
          )}
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* 카르텔 정보 */}
          <div className="bg-background border rounded-xl p-5 mb-6">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-lg font-semibold">{cartelData.name}</h1>
                    {cartelData.myRole === "owner" && (
                      <Crown className="w-4 h-4 text-yellow-500" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    멤버 {cartelData.members}/{cartelData.maxMembers}
                  </p>
                </div>
              </div>
              <Badge variant="secondary" className="flex items-center gap-1">
                <Trophy className="w-3 h-3" />
                {cartelData.myPoints}P
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">{cartelData.description}</p>
          </div>

          {/* 탭 */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full grid grid-cols-2 mb-6">
              <TabsTrigger value="missions">미션 피드</TabsTrigger>
              <TabsTrigger value="members">멤버 ({cartelData.members})</TabsTrigger>
            </TabsList>

            <TabsContent value="missions" className="space-y-4">
              {/* 미션 등록 버튼 */}
              <Button className="w-full rounded-full" asChild>
                <Link href={`/dashboard/cartel/${params.cartelId}/mission/create`}>
                  <Plus className="w-4 h-4 mr-2" />
                  새 미션 등록하기
                </Link>
              </Button>

              {/* 미션 리스트 - 2열 그리드 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {missions.map((mission) => (
                  <div
                    key={mission.id}
                    className={`bg-background border rounded-xl overflow-hidden ${
                      mission.isCompleted ? "opacity-60" : ""
                    }`}
                  >
                    {/* 블로그 OG 프리뷰 배너 */}
                    <a
                      href={mission.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block group"
                    >
                      <div className="relative aspect-[1.91/1] overflow-hidden">
                        {mission.thumbnail ? (
                          <img
                            src={mission.thumbnail}
                            alt={mission.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full bg-muted flex items-center justify-center">
                            <ExternalLink className="w-8 h-8 text-muted-foreground/30" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                          {mission.siteName && (
                            <p className="text-[10px] opacity-70 mb-0.5">{mission.siteName}</p>
                          )}
                          <h3 className="font-semibold text-[13px] leading-tight line-clamp-2 group-hover:underline">
                            {mission.title}
                          </h3>
                        </div>
                      </div>
                    </a>

                    {/* 미션 정보 */}
                    <div className="p-3">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-1.5">
                          <div className="w-6 h-6 bg-muted rounded-full flex items-center justify-center text-[10px] font-medium">
                            {mission.authorName.slice(0, 2)}
                          </div>
                          <div>
                            <p className="text-xs font-medium leading-tight">{mission.authorName}</p>
                            <p className="text-[10px] text-muted-foreground">{mission.createdAt}</p>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                          +{mission.points}P
                        </Badge>
                      </div>

                      <div className="flex items-center gap-1 mb-2 flex-wrap">
                        {mission.requiredActions.map((action) => (
                          <Badge key={action} variant="secondary" className="text-[10px] px-1.5 py-0 flex items-center gap-0.5">
                            {actionIcons[action]}
                            {action}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>{mission.completedBy}/{mission.totalMembers}명</span>
                        </div>

                        {!mission.isCompleted ? (
                          <Button
                            size="sm"
                            className="rounded-full text-[10px] h-6 px-2"
                            onClick={() => handleCompleteMission(mission.id)}
                            disabled={completingMission === mission.id}
                          >
                            {completingMission === mission.id ? (
                              <Clock className="w-3 h-3 animate-spin" />
                            ) : (
                              "완료"
                            )}
                          </Button>
                        ) : (
                          <Badge variant="default" className="text-[10px] px-1.5 py-0">
                            완료됨
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="members" className="space-y-3">
              {cartelData.myRole === "owner" && (
                <Button variant="outline" className="w-full rounded-full mb-4">
                  <UserPlus className="w-4 h-4 mr-2" />
                  멤버 초대하기
                </Button>
              )}

              {members.map((member, index) => (
                <div
                  key={member.id}
                  className="bg-background border rounded-xl p-4 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center text-sm font-medium">
                        {member.name.slice(0, 2)}
                      </div>
                      {index < 3 && (
                        <div className={`absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                          index === 0 ? "bg-yellow-500 text-white" :
                          index === 1 ? "bg-gray-400 text-white" :
                          "bg-amber-700 text-white"
                        }`}>
                          {index + 1}
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-sm">{member.name}</p>
                        {member.role === "owner" && (
                          <Crown className="w-3 h-3 text-yellow-500" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        완료 미션 {member.completedMissions}개
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-primary">{member.points}P</p>
                  </div>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>
    </div>
  );
}
