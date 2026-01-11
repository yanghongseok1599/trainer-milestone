"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { auth, onAuthStateChanged } from "@/lib/firebase/client";
import { signOut } from "firebase/auth";
import type { User as FirebaseUser } from "firebase/auth";
import { createClient } from "@/lib/supabase/client";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  MeasuringStrategy,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  LogOut,
  User,
  PenLine,
  ImagePlus,
  LayoutGrid,
  Search,
  Users,
  Heart,
  TrendingUp,
  BarChart3,
  BookOpen,
  Dumbbell,
  MessageSquare,
  Bell,
  Calendar,
  Target,
  FileText,
  Video,
  Palette,
  Type,
  Megaphone,
  MousePointerClick,
  PieChart,
  Zap,
  Info,
  UserPlus,
  Trophy,
  Package,
  Stamp,
  QrCode,
  ClipboardCheck,
  Award,
  Bot,
  Globe,
  Activity,
  BatteryLow,
  DollarSign,
  UserCog,
  GraduationCap,
  ClipboardList,
  Handshake,
  AtSign,
  Star,
  Briefcase,
  UserX,
  BadgeDollarSign,
  Presentation,
  Crown,
  Film,
  Smartphone,
  Pencil,
  Check,
  X,
  Settings,
  Clock,
  Eye,
  EyeOff,
  GripVertical,
  CheckCircle2,
  Circle,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

// 아이콘 매핑
const iconMap: Record<string, LucideIcon> = {
  Briefcase, ClipboardCheck, Award, BatteryLow, Crown, Target, TrendingUp, Star,
  PenLine, BarChart3, ImagePlus, Film, LayoutGrid, AtSign, Users, Heart,
  Smartphone, Bot, Globe, Video, Palette, Stamp, QrCode, Type, DollarSign,
  BadgeDollarSign, UserX, Presentation, UserCog, GraduationCap, ClipboardList,
  Handshake, Megaphone, MousePointerClick, PieChart, Zap, Info, UserPlus, Trophy, Package,
};

interface Tool {
  iconName: string;
  name: string;
  desc: string;
  href: string;
  comingSoon?: boolean;
  hidden?: boolean;
}

interface Category {
  id: string;
  name: string;
  description: string;
  tools: Tool[];
  hidden?: boolean;
}

const defaultCategories: Category[] = [
  {
    id: "productivity",
    name: "업무 향상",
    description: "나만의 업무 환경과 자기 진단",
    tools: [
      { iconName: "Briefcase", name: "나만의 온라인 작업실", desc: "커스텀 홈페이지 제작", href: "#" },
      { iconName: "Award", name: "강점검사", desc: "트레이너 핵심 강점 분석", href: "#" },
      { iconName: "UserX", name: "회원 이탈 분석", desc: "이탈 패턴 및 원인 파악,관리", href: "#" },
      { iconName: "BatteryLow", name: "번아웃 지수 체크", desc: "소진 위험도 측정", href: "#" },
    ],
  },
  {
    id: "marketing",
    name: "마케팅",
    description: "브랜드 분석 및 경쟁사 모니터링",
    hidden: true,
    tools: [
      { iconName: "Crown", name: "브랜드 파워 진단", desc: "나만의 차별화 포인트 분석", href: "#" },
      { iconName: "Target", name: "마케팅 방향성 진단기", desc: "최적 마케팅 전략 분석", href: "#" },
      { iconName: "TrendingUp", name: "경쟁사 분석", desc: "주변 센터 전략 분석", href: "#" },
      { iconName: "Star", name: "리뷰 모니터링", desc: "네이버/구글 리뷰 분석", href: "#" },
    ],
  },
  {
    id: "blog",
    name: "블로그",
    description: "블로그 콘텐츠 자동 생성",
    tools: [
      { iconName: "PenLine", name: "AI 글쓰기", desc: "SEO 최적화 글 작성", href: "#" },
      { iconName: "BarChart3", name: "블로그 지수", desc: "내 블로그 최적화 분석", href: "#" },
      { iconName: "ImagePlus", name: "비포애프터 생성기", desc: "변화 비교 이미지", href: "#" },
      { iconName: "QrCode", name: "프롬프트 모음", desc: "ai 이미지 생성 프롬프트 모음", href: "#" },
    ],
  },
  {
    id: "sns",
    name: "SNS",
    description: "소셜 미디어 콘텐츠 및 자동화",
    tools: [
      { iconName: "LayoutGrid", name: "카드뉴스 생성기", desc: "카드뉴스 자동 디자인", href: "#", comingSoon: true },
      { iconName: "AtSign", name: "쓰레드 AI 글쓰기", desc: "쓰레드 콘텐츠 작성", href: "#", comingSoon: true },
      { iconName: "Users", name: "서로이웃", desc: "자동 서로이웃 신청", href: "#", comingSoon: true },
      { iconName: "Heart", name: "좋아요/댓글", desc: "자동 공감 활동", href: "#", comingSoon: true },
    ],
  },
  {
    id: "crm",
    name: "회원 관리",
    description: "회원 소통 및 관리 도구",
    tools: [
      { iconName: "Smartphone", name: "나만의 센터 어플 만들기", desc: "맞춤형 피트니스 앱 제작", href: "#", comingSoon: true },
      { iconName: "Bot", name: "AI상담 챗봇", desc: "24시간 자동 상담", href: "#", comingSoon: true },
      { iconName: "Globe", name: "회원관리 전용 홈페이지", desc: "나만의 회원 관리 사이트", href: "#", comingSoon: true },
      { iconName: "Video", name: "운동 영상", desc: "홈트 영상 공유", href: "#", hidden: true },
    ],
  },
  {
    id: "design",
    name: "디자인",
    description: "마케팅 시각 자료 제작",
    hidden: true,
    tools: [
      { iconName: "Palette", name: "로고 생성기", desc: "AI 로고 디자인", href: "#" },
      { iconName: "Stamp", name: "도장 생성기", desc: "전자 도장 제작", href: "#" },
      { iconName: "QrCode", name: "QR 생성기", desc: "맞춤 QR코드 제작", href: "#" },
      { iconName: "Type", name: "썸네일 자동 생성기", desc: "블로그 썸네일 제작", href: "#" },
    ],
  },
  {
    id: "diagnosis",
    name: "경영 진단",
    description: "수익 및 경영 분석 도구",
    hidden: true,
    tools: [
      { iconName: "DollarSign", name: "수익성 진단", desc: "매출/비용 구조 분석", href: "#" },
      { iconName: "BadgeDollarSign", name: "가격 전략 분석", desc: "적정 PT 가격 설정", href: "#" },
      { iconName: "Presentation", name: "세일즈 역량 진단", desc: "영업/상담 스킬 분석", href: "#" },
    ],
  },
  {
    id: "hr",
    name: "인사 관리",
    description: "직원 채용 및 관리 도구",
    hidden: true,
    tools: [
      { iconName: "UserCog", name: "직원 역량 평가", desc: "트레이너 성과 분석", href: "#" },
      { iconName: "GraduationCap", name: "교육 프로그램", desc: "직원 교육 관리", href: "#" },
      { iconName: "ClipboardList", name: "근무 스케줄", desc: "시간표 자동 생성", href: "#" },
      { iconName: "Handshake", name: "면접 가이드", desc: "채용 면접 질문지", href: "#" },
    ],
  },
  {
    id: "ads",
    name: "광고",
    description: "유료 광고 관리 및 분석",
    hidden: true,
    tools: [
      { iconName: "Megaphone", name: "네이버 광고", desc: "검색 광고 관리", href: "#" },
      { iconName: "MousePointerClick", name: "인스타 광고", desc: "SNS 광고 관리", href: "#" },
      { iconName: "PieChart", name: "광고 성과", desc: "ROI 분석 리포트", href: "#" },
      { iconName: "Zap", name: "자동 최적화", desc: "AI 광고 최적화", href: "#" },
    ],
  },
  {
    id: "cartel",
    name: "블로그 카르텔",
    description: "블로거 네트워크 및 상호 홍보",
    tools: [
      { iconName: "Info", name: "카르텔 소개", desc: "블로그 카르텔이란?", href: "/dashboard/cartel/intro" },
      { iconName: "UserPlus", name: "카르텔 가입", desc: "카르텔 생성/참여", href: "/dashboard/cartel" },
      { iconName: "Trophy", name: "카르텔 챌린지", desc: "미션 등록 및 수행", href: "/dashboard/cartel/1" },
      { iconName: "Package", name: "카르텔 패키지", desc: "프리미엄 기능", href: "/dashboard/cartel/package" },
    ],
  },
];

// SortableToolCard 컴포넌트
interface SortableToolCardProps {
  id: string;
  tool: Tool;
  toolIndex: number;
  categoryId: string;
  IconComponent: LucideIcon;
  isEditingThisTool: boolean;
  editForm: { name: string; description: string; desc: string; href: string; comingSoon: boolean };
  setEditForm: (form: { name: string; description: string; desc: string; href: string; comingSoon: boolean }) => void;
  saveEditTool: () => void;
  cancelEdit: () => void;
  toggleToolVisibility: (categoryId: string, toolIndex: number) => void;
  startEditTool: (categoryId: string, toolIndex: number, tool: Tool) => void;
}

function SortableToolCard({
  id,
  tool,
  toolIndex,
  categoryId,
  IconComponent,
  isEditingThisTool,
  editForm,
  setEditForm,
  saveEditTool,
  cancelEdit,
  toggleToolVisibility,
  startEditTool,
}: SortableToolCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition: transition ?? 'transform 250ms cubic-bezier(0.25, 1, 0.5, 1)',
    opacity: isDragging ? 0.9 : 1,
    zIndex: isDragging ? 1000 : 1,
    scale: isDragging ? '1.02' : '1',
    boxShadow: isDragging ? '0 10px 20px -5px rgba(0, 0, 0, 0.2)' : 'none',
  };

  if (isEditingThisTool) {
    return (
      <div ref={setNodeRef} style={style} className="bg-background border-2 border-primary rounded-xl p-4 space-y-2">
        <Label className="text-xs">도구 이름</Label>
        <Input
          value={editForm.name}
          onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
          placeholder="도구 이름"
          className="text-sm"
        />
        <Label className="text-xs">설명</Label>
        <Input
          value={editForm.desc}
          onChange={(e) => setEditForm({ ...editForm, desc: e.target.value })}
          placeholder="도구 설명"
          className="text-sm"
        />
        <Label className="text-xs">URL</Label>
        <Input
          value={editForm.href}
          onChange={(e) => setEditForm({ ...editForm, href: e.target.value })}
          placeholder="/dashboard/..."
          className="text-sm"
        />
        <div className="flex items-center gap-2 pt-2">
          <input
            type="checkbox"
            id={`comingSoon-${id}`}
            checked={editForm.comingSoon}
            onChange={(e) => setEditForm({ ...editForm, comingSoon: e.target.checked })}
            className="w-4 h-4 rounded border-gray-300"
          />
          <Label htmlFor={`comingSoon-${id}`} className="text-xs cursor-pointer">
            출시예정 표시
          </Label>
        </div>
        <div className="flex gap-2 pt-2">
          <Button size="sm" onClick={saveEditTool} className="flex-1">
            <Check className="w-3 h-3 mr-1" /> 저장
          </Button>
          <Button size="sm" variant="outline" onClick={cancelEdit}>
            <X className="w-3 h-3" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative ${tool.hidden ? "opacity-50" : ""}`}
    >
      {/* 드래그 핸들 및 편집 버튼 */}
      <div className="absolute -top-2 -right-2 z-10 flex gap-1">
        <div
          {...attributes}
          {...listeners}
          className="w-6 h-6 p-0 rounded-full bg-primary/90 text-white flex items-center justify-center cursor-grab active:cursor-grabbing hover:bg-primary transition-colors"
        >
          <GripVertical className="w-3 h-3" />
        </div>
        <Button
          size="sm"
          variant="secondary"
          className="w-6 h-6 p-0 rounded-full"
          onClick={() => toggleToolVisibility(categoryId, toolIndex)}
        >
          {tool.hidden ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
        </Button>
        <Button
          size="sm"
          variant="secondary"
          className="w-6 h-6 p-0 rounded-full"
          onClick={() => startEditTool(categoryId, toolIndex, tool)}
        >
          <Pencil className="w-3 h-3" />
        </Button>
      </div>
      {tool.comingSoon && (
        <div className="absolute top-2 right-2 z-10 flex items-center gap-1 bg-amber-500 text-white text-[10px] font-medium px-2 py-0.5 rounded-full">
          <Clock className="w-3 h-3" />
          출시예정
        </div>
      )}
      <div className={`block bg-background border rounded-xl p-4 ${isDragging ? "border-primary bg-primary/5" : ""}`}>
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${isDragging ? "bg-primary/20" : "bg-muted"}`}>
          <IconComponent className={`w-5 h-5 ${isDragging ? "text-primary" : "text-muted-foreground"}`} />
        </div>
        <h3 className="font-medium text-sm mb-1">{tool.name}</h3>
        <p className="text-xs text-muted-foreground">{tool.desc}</p>
        <p className="text-xs text-blue-500 mt-1 truncate">{tool.href}</p>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [demoMode, setDemoMode] = useState(false);
  const [isAdminUser, setIsAdminUser] = useState(false);
  const [adminInfo, setAdminInfo] = useState<{ id: string; role: string } | null>(null);

  // 편집 관련 state
  const [categories, setCategories] = useState<Category[]>(defaultCategories);
  const [editMode, setEditMode] = useState(false);
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [editingTool, setEditingTool] = useState<{ categoryId: string; toolIndex: number } | null>(null);
  const [editForm, setEditForm] = useState({ name: "", description: "", desc: "", href: "", comingSoon: false });

  // 사용자 선택 도구 state
  const [selectedTools, setSelectedTools] = useState<Set<string>>(new Set());

  // 드래그 앤 드롭 센서
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // 도구 순서 변경 핸들러
  const handleDragEnd = (event: DragEndEvent, categoryId: string) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const category = categories.find(cat => cat.id === categoryId);
      if (!category) return;

      const activeToolName = String(active.id).replace(`${categoryId}-`, '');
      const overToolName = String(over.id).replace(`${categoryId}-`, '');

      const oldIndex = category.tools.findIndex(tool => tool.name === activeToolName);
      const newIndex = category.tools.findIndex(tool => tool.name === overToolName);

      if (oldIndex !== -1 && newIndex !== -1) {
        const newCategories = categories.map(cat => {
          if (cat.id === categoryId) {
            return { ...cat, tools: arrayMove(cat.tools, oldIndex, newIndex) };
          }
          return cat;
        });
        saveCategories(newCategories);
      }
    }
  };

  // Supabase에서 저장된 카테고리 불러오기
  const loadCategoriesFromSupabase = useCallback(async () => {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("admin_dashboard_settings")
        .select("setting_value")
        .eq("setting_key", "dashboard_categories")
        .single();

      if (error) {
        console.log("No saved settings found, using defaults");
        setCategories(defaultCategories);
        return;
      }

      if (data?.setting_value) {
        setCategories(data.setting_value as Category[]);
      }
    } catch (err) {
      console.error("Failed to load categories:", err);
      setCategories(defaultCategories);
    }
  }, []);

  useEffect(() => {
    loadCategoriesFromSupabase();

    // 선택된 도구 불러오기 (이건 사용자별이므로 localStorage 유지)
    const savedSelected = localStorage.getItem("selectedTools");
    if (savedSelected) {
      try {
        setSelectedTools(new Set(JSON.parse(savedSelected)));
      } catch {
        setSelectedTools(new Set());
      }
    }
  }, [loadCategoriesFromSupabase]);

  // 도구 선택 토글
  const toggleToolSelection = (toolKey: string) => {
    setSelectedTools(prev => {
      const newSet = new Set(prev);
      if (newSet.has(toolKey)) {
        newSet.delete(toolKey);
      } else {
        newSet.add(toolKey);
      }
      localStorage.setItem("selectedTools", JSON.stringify([...newSet]));
      return newSet;
    });
  };

  // 카테고리 저장 (Supabase)
  const saveCategories = async (newCategories: Category[]) => {
    setCategories(newCategories);

    // 관리자인 경우에만 Supabase에 저장
    if (isAdminUser && adminInfo) {
      try {
        const supabase = createClient();
        const { error } = await supabase
          .from("admin_dashboard_settings")
          .upsert({
            setting_key: "dashboard_categories",
            setting_value: newCategories,
            updated_by: adminInfo.id,
            updated_at: new Date().toISOString(),
          }, {
            onConflict: "setting_key",
          });

        if (error) {
          console.error("Failed to save categories:", error);
          alert("설정 저장에 실패했습니다. 다시 시도해주세요.");
        } else {
          console.log("Categories saved to Supabase successfully");
        }
      } catch (err) {
        console.error("Failed to save categories:", err);
      }
    }
  };

  // 카테고리 편집 시작
  const startEditCategory = (category: Category) => {
    setEditingCategory(category.id);
    setEditForm({ name: category.name, description: category.description, desc: "", href: "", comingSoon: false });
  };

  // 카테고리 편집 저장
  const saveEditCategory = (categoryId: string) => {
    const newCategories = categories.map(cat =>
      cat.id === categoryId
        ? { ...cat, name: editForm.name, description: editForm.description }
        : cat
    );
    saveCategories(newCategories);
    setEditingCategory(null);
  };

  // 도구 편집 시작
  const startEditTool = (categoryId: string, toolIndex: number, tool: Tool) => {
    setEditingTool({ categoryId, toolIndex });
    setEditForm({ name: tool.name, description: "", desc: tool.desc, href: tool.href, comingSoon: tool.comingSoon || false });
  };

  // 도구 편집 저장
  const saveEditTool = () => {
    if (!editingTool) return;
    const newCategories = categories.map(cat => {
      if (cat.id === editingTool.categoryId) {
        const newTools = [...cat.tools];
        newTools[editingTool.toolIndex] = {
          ...newTools[editingTool.toolIndex],
          name: editForm.name,
          desc: editForm.desc,
          href: editForm.href,
          comingSoon: editForm.comingSoon,
        };
        return { ...cat, tools: newTools };
      }
      return cat;
    });
    saveCategories(newCategories);
    setEditingTool(null);
  };

  // 편집 취소
  const cancelEdit = () => {
    setEditingCategory(null);
    setEditingTool(null);
  };

  // 카테고리 숨김 토글
  const toggleCategoryVisibility = (categoryId: string) => {
    const newCategories = categories.map(cat =>
      cat.id === categoryId ? { ...cat, hidden: !cat.hidden } : cat
    );
    saveCategories(newCategories);
  };

  // 도구 숨김 토글
  const toggleToolVisibility = (categoryId: string, toolIndex: number) => {
    const newCategories = categories.map(cat => {
      if (cat.id === categoryId) {
        const newTools = [...cat.tools];
        newTools[toolIndex] = { ...newTools[toolIndex], hidden: !newTools[toolIndex].hidden };
        return { ...cat, tools: newTools };
      }
      return cat;
    });
    saveCategories(newCategories);
  };

  // 초기화
  const resetToDefault = async () => {
    if (confirm("모든 변경사항을 초기화하시겠습니까?")) {
      setCategories(defaultCategories);

      // Supabase에서도 삭제
      if (isAdminUser && adminInfo) {
        try {
          const supabase = createClient();
          await supabase
            .from("admin_dashboard_settings")
            .delete()
            .eq("setting_key", "dashboard_categories");
          console.log("Settings reset in Supabase");
        } catch (err) {
          console.error("Failed to reset settings:", err);
        }
      }
    }
  };

  useEffect(() => {
    // 관리자 로그인 확인
    const isAdminLoggedIn = localStorage.getItem("isAdminLoggedIn");
    const adminUserData = localStorage.getItem("adminUser");

    if (isAdminLoggedIn === "true" && adminUserData) {
      setIsAdminUser(true);
      setAdminInfo(JSON.parse(adminUserData));
      setLoading(false);
      return;
    }

    // Firebase 인증 상태 확인
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        setLoading(false);
      } else {
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    // 관리자 로그아웃
    if (isAdminUser) {
      localStorage.removeItem("isAdminLoggedIn");
      localStorage.removeItem("adminUser");
      router.push("/");
      return;
    }

    if (demoMode) {
      router.push("/");
      return;
    }

    try {
      await signOut(auth);
    } catch {
      // Ignore errors
    }
    router.push("/");
    router.refresh();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const displayEmail = isAdminUser ? `${adminInfo?.id} (관리자)` : demoMode ? "demo@trainermilestone.com" : user?.email;

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <header className="border-b bg-background sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link href="/" className="font-semibold text-sm">
            트레이너 마일스톤
          </Link>
          <div className="flex items-center gap-4">
            {isAdminUser && (
              <Button
                variant={editMode ? "default" : "outline"}
                size="sm"
                onClick={() => setEditMode(!editMode)}
                className="text-xs"
              >
                <Settings className="w-3 h-3 mr-1" />
                {editMode ? "편집 완료" : "편집 모드"}
              </Button>
            )}
            <span className="text-sm text-muted-foreground hidden sm:block">
              {displayEmail}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-muted-foreground"
            >
              <LogOut className="w-4 h-4 mr-2" />
              로그아웃
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 py-8 sm:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {demoMode && (
              <div className="mb-6 p-3 rounded-lg bg-primary/10 text-primary text-sm text-center">
                데모 모드입니다.
              </div>
            )}

            {editMode && (
              <div className="mb-6 p-3 rounded-lg bg-amber-500/10 text-amber-700 text-sm flex items-center justify-between">
                <span>편집 모드가 활성화되었습니다. 카테고리와 도구를 수정할 수 있습니다.</span>
                <Button variant="outline" size="sm" onClick={resetToDefault} className="text-xs">
                  초기화
                </Button>
              </div>
            )}

            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-semibold">안녕하세요!</h1>
                <p className="text-sm text-muted-foreground">
                  오늘도 효율적인 마케팅을 시작해보세요
                </p>
              </div>
            </div>

            <div className="space-y-10">
              {categories
                .filter(category => editMode || !category.hidden)
                .map((category, categoryIndex) => {
                  const visibleTools = editMode
                    ? category.tools
                    : category.tools.filter(tool => !tool.hidden);

                  if (!editMode && visibleTools.length === 0) return null;

                  return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                  className={category.hidden ? "opacity-50" : ""}
                >
                  <div className="flex items-center justify-between mb-4">
                    {editingCategory === category.id ? (
                      <div className="flex-1 space-y-2">
                        <div className="flex gap-2">
                          <Input
                            value={editForm.name}
                            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                            placeholder="카테고리 이름"
                            className="max-w-xs"
                          />
                          <Button size="sm" onClick={() => saveEditCategory(category.id)}>
                            <Check className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={cancelEdit}>
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                        <Input
                          value={editForm.description}
                          onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                          placeholder="카테고리 설명"
                          className="max-w-md"
                        />
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <div>
                          <h2 className="text-lg font-semibold">
                            {category.name}
                            {category.hidden && <span className="ml-2 text-xs text-muted-foreground">(숨김)</span>}
                          </h2>
                          <p className="text-sm text-muted-foreground">
                            {category.description}
                          </p>
                        </div>
                        {editMode && (
                          <>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => startEditCategory(category)}
                              className="ml-2"
                            >
                              <Pencil className="w-3 h-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => toggleCategoryVisibility(category.id)}
                              className={category.hidden ? "text-muted-foreground" : "text-primary"}
                            >
                              {category.hidden ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </Button>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                  {editMode ? (
                    <DndContext
                      sensors={sensors}
                      collisionDetection={closestCenter}
                      onDragEnd={(event) => handleDragEnd(event, category.id)}
                      measuring={{
                        droppable: {
                          strategy: MeasuringStrategy.Always,
                        },
                      }}
                    >
                      <SortableContext
                        items={category.tools.map(tool => `${category.id}-${tool.name}`)}
                        strategy={rectSortingStrategy}
                      >
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                          {category.tools.map((tool, toolIndex) => {
                              const IconComponent = iconMap[tool.iconName] || Info;
                              const isEditingThisTool = editingTool?.categoryId === category.id && editingTool?.toolIndex === toolIndex;

                              return (
                                <SortableToolCard
                                  key={`${category.id}-${tool.name}`}
                                  id={`${category.id}-${tool.name}`}
                                  tool={tool}
                                  toolIndex={toolIndex}
                                  categoryId={category.id}
                                  IconComponent={IconComponent}
                                  isEditingThisTool={isEditingThisTool}
                                  editForm={editForm}
                                  setEditForm={setEditForm}
                                  saveEditTool={saveEditTool}
                                  cancelEdit={cancelEdit}
                                  toggleToolVisibility={toggleToolVisibility}
                                  startEditTool={startEditTool}
                                />
                              );
                            })}
                        </div>
                      </SortableContext>
                    </DndContext>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {category.tools
                        .filter(tool => !tool.hidden)
                        .map((tool, toolIndex) => {
                          const IconComponent = iconMap[tool.iconName] || Info;
                          return (
                            <div key={toolIndex} className="relative">
                              {tool.comingSoon && (
                                <div className="absolute top-2 right-2 z-10 flex items-center gap-1 bg-amber-500 text-white text-[10px] font-medium px-2 py-0.5 rounded-full">
                                  <Clock className="w-3 h-3" />
                                  출시예정
                                </div>
                              )}
                              <a
                                href={tool.comingSoon ? "#" : tool.href}
                                target={tool.comingSoon || tool.href === "#" ? "_self" : "_blank"}
                                rel={tool.comingSoon || tool.href === "#" ? undefined : "noopener noreferrer"}
                                onClick={(e) => tool.comingSoon && e.preventDefault()}
                                className={`block bg-background border rounded-xl p-4 transition-all group ${
                                  tool.comingSoon ? "cursor-default opacity-75" : "hover:border-primary/50 hover:shadow-sm"
                                }`}
                              >
                                <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center mb-3 group-hover:bg-primary/10 transition-colors">
                                  <IconComponent className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                                </div>
                                <h3 className="font-medium text-sm mb-1">{tool.name}</h3>
                                <p className="text-xs text-muted-foreground">{tool.desc}</p>
                              </a>
                            </div>
                          );
                        })}
                    </div>
                  )}
                </motion.div>
                  );
                })}
            </div>

            <div className="mt-12 p-6 bg-background border rounded-xl text-center">
              <p className="text-muted-foreground mb-4">
                각 도구의 상세 기능은 곧 출시됩니다!
              </p>
              <Button variant="outline" className="rounded-full" asChild>
                <Link href="/">랜딩 페이지로 돌아가기</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
