// components/layout/Sidebar.tsx
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { FileBarChart2, LayoutDashboard, Moon, Sun, Users } from 'lucide-react';
import { Link, useLocation } from 'react-router';

import { Theme } from '~/common/constants';
import { useTheme } from '~/hooks/use-theme';
import { cn } from '~/lib/utils';

import { Button } from './ui/button';

const sidebarItems = [
  {
    title: '개요',
    links: [{ label: '대시보드', icon: LayoutDashboard, href: '/dashboard' }],
  },
  {
    title: '관리',
    links: [
      { label: '유저', icon: Users, href: '/users' },
      { label: '리포트', icon: FileBarChart2, href: '/reports' },
    ],
  },
];

export default function Sidebar() {
  const location = useLocation();
  const [theme, setTheme] = useTheme();

  return (
    <aside className="relative flex h-full w-64 flex-col border-r bg-background text-sm">
      {/* 상단 영역 */}
      <div className="relative flex items-center justify-between p-6">
        <Link to="/" className="text-2xl font-bold">
          관리자 템플릿
        </Link>

        {/* 오른쪽 상단 다크모드 토글 아이콘 버튼 */}
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground"
          onClick={() => setTheme(theme === Theme.DARK ? Theme.LIGHT : Theme.DARK)}
        >
          {theme === Theme.DARK ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* 메뉴 */}
      <ScrollArea className="flex-1 px-4">
        <nav className="space-y-6">
          {sidebarItems.map((section) => (
            <div key={section.title} className="space-y-2">
              <div className="px-3 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                {section.title}
              </div>
              <div className="space-y-1">
                {section.links.map((link) => {
                  const isActive = location.pathname === link.href;

                  return (
                    <Link
                      key={link.href}
                      to={link.href}
                      className={cn(
                        'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all hover:bg-accent',
                        isActive ? 'bg-muted text-primary' : 'text-muted-foreground',
                      )}
                    >
                      <link.icon className="h-4 w-4" />
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </ScrollArea>

      {/* 유저 정보는 남겨둠 (선택사항) */}
      <div className="border-t p-4">
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <span className="text-sm font-medium">관리자</span>
            <span className="text-xs text-muted-foreground">admin@example.com</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
