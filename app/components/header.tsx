// components/layout/Header.tsx
import { LogOut } from 'lucide-react';
import { Link, useLocation } from 'react-router';

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';

// ✅ 경로별 한글 제목 매핑
const pageTitles: Record<string, string> = {
  '/dashboard': '대시보드',
  '/users': '유저 관리',
  '/reports': '리포트',
};

export default function Header() {
  const location = useLocation();
  const pathname = location.pathname;

  // 정확히 일치하는 경우만 처리
  const title = pageTitles[pathname] || '관리자 페이지';

  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-6">
      {/* 왼쪽: 현재 경로에 따라 한글 제목 */}
      <h1 className="text-xl font-semibold">{title}</h1>

      {/* 오른쪽: 아바타 + 로그아웃 */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/admin-avatar.png" alt="Admin" />
            <AvatarFallback>관리</AvatarFallback>
          </Avatar>
          <span className="text-sm text-muted-foreground">admin@example.com</span>
        </div>
        <Link to="/login" className="">
          <Button variant="outline" size="sm">
            <LogOut className="mr-2 h-4 w-4" />
            로그아웃
          </Button>
        </Link>
      </div>
    </header>
  );
}
