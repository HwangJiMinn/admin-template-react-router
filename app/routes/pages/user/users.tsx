import { Card, CardContent, CardHeader } from '~/components/ui/card';

export default function Users() {
  return (
    <Card>
      <CardHeader>
        <h2 className="text-xl font-semibold">👤 사용자 관리</h2>
      </CardHeader>
      <CardContent>사용자 목록을 여기에 렌더링</CardContent>
    </Card>
  );
}
