import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl sm:text-8xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-xl sm:text-2xl font-semibold mb-2">
          페이지를 찾을 수 없습니다
        </h2>
        <p className="text-muted-foreground mb-8 max-w-md">
          요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
        </p>
        <Button asChild className="rounded-full">
          <Link href="/">
            <Home className="w-4 h-4 mr-2" />
            홈으로 돌아가기
          </Link>
        </Button>
      </div>
    </div>
  );
}
