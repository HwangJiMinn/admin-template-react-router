import { Button } from '~/components/ui/button';

import { useUsers } from '../context/users-context';

export function UsersPrimaryButtons() {
  const { setOpen } = useUsers();
  return (
    <div className="flex gap-2">
      <Button variant="outline" className="space-x-1" onClick={() => setOpen('invite')}>
        <span>Invite User</span>
      </Button>
      <Button className="space-x-1" onClick={() => setOpen('add')}>
        <span>Add User</span>
      </Button>
    </div>
  );
}
