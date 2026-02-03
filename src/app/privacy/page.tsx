"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            홈으로
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <h1 className="text-3xl font-bold mb-8">개인정보처리방침</h1>

        <div className="prose prose-sm max-w-none space-y-8 text-muted-foreground">
          <p className="text-foreground">
            트레이너 마일스톤(이하 &quot;회사&quot;)은 이용자의 개인정보를 중요시하며,
            「개인정보 보호법」을 준수하고 있습니다.
          </p>
          <p>시행일자: 2024년 1월 1일</p>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">1. 수집하는 개인정보 항목</h2>
            <p>회사는 서비스 제공을 위해 다음과 같은 개인정보를 수집합니다.</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li><strong>필수항목:</strong> 이메일 주소, 비밀번호, 이름(닉네임)</li>
              <li><strong>선택항목:</strong> 프로필 이미지, 연락처, 소속 센터명</li>
              <li><strong>자동수집:</strong> IP 주소, 쿠키, 서비스 이용기록, 접속 로그</li>
              <li><strong>소셜 로그인 시:</strong> 소셜 계정 식별자, 이메일, 프로필 정보</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">2. 개인정보의 수집 및 이용 목적</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>회원 가입 및 관리: 회원제 서비스 제공, 본인 확인</li>
              <li>서비스 제공: AI 콘텐츠 생성, 마케팅 도구 제공</li>
              <li>결제 처리: 유료 서비스 결제 및 환불</li>
              <li>고객 지원: 문의 응대, 공지사항 전달</li>
              <li>서비스 개선: 이용 통계 분석, 서비스 품질 향상</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">3. 개인정보의 보유 및 이용 기간</h2>
            <p>
              회사는 개인정보 수집 및 이용 목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다.
              단, 관계 법령에 따라 보존이 필요한 경우 해당 기간 동안 보관합니다.
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>계약 또는 청약철회 기록: 5년 (전자상거래법)</li>
              <li>대금결제 및 재화 공급 기록: 5년 (전자상거래법)</li>
              <li>소비자 불만 또는 분쟁 처리 기록: 3년 (전자상거래법)</li>
              <li>로그인 기록: 3개월 (통신비밀보호법)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">4. 개인정보의 제3자 제공</h2>
            <p>
              회사는 원칙적으로 이용자의 개인정보를 제3자에게 제공하지 않습니다.
              다만, 다음의 경우에는 예외로 합니다.
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>이용자가 사전에 동의한 경우</li>
              <li>법령에 의거하거나, 수사 목적으로 법령에 정해진 절차에 따라 요청이 있는 경우</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">5. 개인정보의 처리 위탁</h2>
            <p>회사는 서비스 제공을 위해 다음과 같이 개인정보 처리를 위탁합니다.</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li><strong>토스페이먼츠:</strong> 결제 처리</li>
              <li><strong>Firebase (Google):</strong> 사용자 인증</li>
              <li><strong>Supabase:</strong> 데이터 저장</li>
              <li><strong>Vercel:</strong> 웹 호스팅</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">6. 이용자의 권리와 행사 방법</h2>
            <p>이용자는 언제든지 다음의 권리를 행사할 수 있습니다.</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>개인정보 열람 요구</li>
              <li>개인정보 정정 및 삭제 요구</li>
              <li>개인정보 처리 정지 요구</li>
              <li>회원 탈퇴</li>
            </ul>
            <p className="mt-3">
              위 권리 행사는 서비스 내 설정 또는 이메일(info@trainer_milestone.com)을 통해 가능합니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">7. 개인정보의 안전성 확보 조치</h2>
            <p>회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다.</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>개인정보의 암호화</li>
              <li>해킹 등에 대비한 기술적 대책</li>
              <li>개인정보 접근 제한</li>
              <li>접속기록의 보관 및 위변조 방지</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">8. 쿠키의 사용</h2>
            <p>
              회사는 이용자에게 개별적인 맞춤 서비스를 제공하기 위해 쿠키(cookie)를 사용합니다.
              이용자는 브라우저 설정을 통해 쿠키 저장을 거부할 수 있으나,
              이 경우 서비스 이용에 제한이 있을 수 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">9. 개인정보 보호책임자</h2>
            <ul className="list-none space-y-1 mt-3">
              <li><strong>담당부서:</strong> 고객지원팀</li>
              <li><strong>이메일:</strong> info@trainer_milestone.com</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">10. 개인정보처리방침 변경</h2>
            <p>
              이 개인정보처리방침은 법령, 정책 또는 보안기술의 변경에 따라 내용이 추가, 삭제 및
              수정될 수 있으며, 변경 시 최소 7일 전에 공지합니다.
            </p>
          </section>

          <p className="pt-8 border-t">
            <strong>공고일자:</strong> 2024년 1월 1일<br />
            <strong>시행일자:</strong> 2024년 1월 1일
          </p>
        </div>
      </main>
    </div>
  );
}
