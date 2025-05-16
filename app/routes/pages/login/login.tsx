// routes/pages/login.tsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';

import { Button } from '~/components/ui/button';
import { Card, CardContent, CardHeader } from '~/components/ui/card';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (email && password) {
      console.log('로그인 요청:', { email, password });
      navigate('/dashboard');
    }
  };

  return (
    <div className="flex h-screen">
      {/* 오른쪽: 로그인 카드 영역 */}
      <div className="flex w-full flex-1 items-center justify-center bg-muted/40">
        <Card className="w-full max-w-sm shadow-lg">
          <CardHeader>
            <h1 className="text-center text-2xl font-bold">
              관리자 로그인 (이미지로 대체)
            </h1>
            <p className="text-center text-sm text-muted-foreground">
              관리자 계정으로 로그인해주세요
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="email">이메일</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">비밀번호</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="비밀번호를 입력하세요"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {/* <Button type="submit" className="w-full">
                로그인
              </Button> */}
              <Link to="/" className="w-full">
                <Button type="submit" className="w-full">
                  로그인
                </Button>
              </Link>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
