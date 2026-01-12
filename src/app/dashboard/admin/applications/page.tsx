"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight, ArrowLeft, Users, Loader2, CheckCircle, XCircle, Clock, ExternalLink, Phone, User, FileText } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface Application {
  id: string; name: string; phone: string; blog_url: string; introduction: string;
  reason: string | null; referral_source: string | null; referrer: string | null;
  status: "pending" | "approved" | "rejected"; created_at: string; updated_at: string;
}

export default function AdminApplicationsPage() {
  const router = useRouter();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("pending");

  useEffect(() => {
    const isAdminLoggedIn = localStorage.getItem("isAdminLoggedIn");
    if (isAdminLoggedIn !== "true") { router.push("/dashboard"); return; }
    setIsAdmin(true); loadApplications();
  }, [router]);

  const loadApplications = async () => {
    try {
      const supabase = createClient();
      const { data, error } = await supabase.from("cartel_applications").select("*").order("created_at", { ascending: false });
      if (error) { console.error("Failed:", error); return; }
      setApplications(data || []);
    } catch (err) { console.error("Failed:", err); } finally { setLoading(false); }
  };

  const updateApplicationStatus = async (id: string, status: "approved" | "rejected") => {
    setProcessingId(id);
    try {
      const supabase = createClient();
      const { error } = await supabase.from("cartel_applications").update({ status, updated_at: new Date().toISOString() }).eq("id", id);
      if (error) { alert("상태 변경 실패"); return; }
      setApplications((prev) => prev.map((app) => (app.id === id ? { ...app, status } : app)));
    } catch (err) { alert("상태 변경 실패"); } finally { setProcessingId(null); }
  };

  const filteredApplications = applications.filter((app) => filter === "all" ? true : app.status === filter);
  const statusCounts = { all: applications.length, pending: applications.filter((a) => a.status === "pending").length, approved: applications.filter((a) => a.status === "approved").length, rejected: applications.filter((a) => a.status === "rejected").length };

  if (!isAdmin) return null;
  if (loading) return (<div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>);

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="border-b bg-background sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-14 flex items-center">
          <Button variant="ghost" size="sm" className="mr-2" asChild><Link href="/dashboard"><ArrowLeft className="w-4 h-4" /></Link></Button>
          <div className="flex items-center gap-2 text-sm">
            <Link href="/dashboard" className="text-muted-foreground hover:text-foreground">대시보드</Link>
            <ChevronRight className="w-4 h-4 text-muted-foreground" /><span className="font-semibold">가입 신청 관리</span>
          </div>
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center"><Users className="w-6 h-6 text-primary" /></div>
              <div><h1 className="text-xl font-bold">카르텔 가입 신청 관리</h1><p className="text-sm text-muted-foreground">신청자를 검토하고 승인/거절하세요</p></div>
            </div>
          </div>
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {[{ key: "pending", label: "대기중", icon: Clock },{ key: "approved", label: "승인됨", icon: CheckCircle },{ key: "rejected", label: "거절됨", icon: XCircle },{ key: "all", label: "전체", icon: FileText }].map(({ key, label, icon: Icon }) => (
              <Button key={key} variant={filter === key ? "default" : "outline"} size="sm" onClick={() => setFilter(key as typeof filter)} className="rounded-full"><Icon className="w-4 h-4 mr-1" />{label} ({statusCounts[key as keyof typeof statusCounts]})</Button>
            ))}
          </div>
          {filteredApplications.length === 0 ? (<div className="text-center py-12 text-muted-foreground"><Users className="w-12 h-12 mx-auto mb-4 opacity-50" /><p>해당 상태의 신청이 없습니다.</p></div>) : (
            <div className="space-y-4">
              {filteredApplications.map((app) => (
                <div key={app.id} className="bg-background border rounded-xl p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3"><div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center"><User className="w-5 h-5 text-muted-foreground" /></div><div><h3 className="font-semibold">{app.name}</h3><p className="text-sm text-muted-foreground flex items-center gap-1"><Phone className="w-3 h-3" />{app.phone}</p></div></div>
                    <div>{app.status === "pending" && <span className="px-2 py-1 bg-amber-500/10 text-amber-600 text-xs rounded-full">대기중</span>}{app.status === "approved" && <span className="px-2 py-1 bg-emerald-500/10 text-emerald-600 text-xs rounded-full">승인됨</span>}{app.status === "rejected" && <span className="px-2 py-1 bg-red-500/10 text-red-600 text-xs rounded-full">거절됨</span>}</div>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div><span className="text-muted-foreground">블로그:</span> <a href={app.blog_url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1">{app.blog_url} <ExternalLink className="w-3 h-3" /></a></div>
                    <div><span className="text-muted-foreground">자기소개:</span><p className="mt-1 whitespace-pre-wrap">{app.introduction}</p></div>
                    {app.reason && <div><span className="text-muted-foreground">가입 동기:</span> {app.reason}</div>}
                    {app.referral_source && <div><span className="text-muted-foreground">유입 경로:</span> {app.referral_source}</div>}
                    {app.referrer && <div><span className="text-muted-foreground">추천인:</span> {app.referrer}</div>}
                    <div className="text-xs text-muted-foreground">신청일: {new Date(app.created_at).toLocaleString("ko-KR")}</div>
                  </div>
                  {app.status === "pending" && (<div className="flex gap-2 mt-4 pt-4 border-t">
                    <Button variant="outline" size="sm" className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50" onClick={() => updateApplicationStatus(app.id, "rejected")} disabled={processingId === app.id}>{processingId === app.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <><XCircle className="w-4 h-4 mr-1" />거절</>}</Button>
                    <Button size="sm" className="flex-1 bg-emerald-600 hover:bg-emerald-700" onClick={() => updateApplicationStatus(app.id, "approved")} disabled={processingId === app.id}>{processingId === app.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <><CheckCircle className="w-4 h-4 mr-1" />승인</>}</Button>
                  </div>)}
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
}
