'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import type { MobileUser, UserStatus } from '@/app/types';
import { cn } from '@/lib/utils';

const schema = z.object({
  status: z.enum(['ACTIVE', 'INACTIVE', 'SUSPENDED']),
});
type FormData = z.infer<typeof schema>;

const STATUS_STYLES: Record<string, string> = {
  ACTIVE:    'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
  INACTIVE:  'bg-muted text-muted-foreground border-0',
  SUSPENDED: 'bg-rose-500/15 text-rose-400 border-rose-500/20',
};

interface UserModalProps {
  open: boolean;
  onClose: () => void;
  user: MobileUser | null;
  onStatusChange: (id: string, status: UserStatus) => void;
}

export function UserModal({ open, onClose, user, onStatusChange }: UserModalProps) {
  const { handleSubmit, setValue, watch } = useForm<FormData>({
    resolver: zodResolver(schema),
    values: { status: (user?.status ?? 'ACTIVE') as UserStatus },
  });

  const currentStatus = watch('status');

  const onSubmit = handleSubmit((data) => {
    if (!user) return;
    onStatusChange(user._id, data.status);
    onClose();
  });

  if (!user) return null;

  const initials = user.fullName.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-sm glass-card border-border/60 rounded-2xl p-6">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-base font-semibold">Update User Status</DialogTitle>
        </DialogHeader>

        {/* User info */}
        <div className="flex items-center gap-3 p-3 rounded-xl bg-white/4 border border-border/40 mb-4">
          <Avatar className="h-9 w-9 shrink-0">
            <AvatarFallback className="text-xs font-bold bg-primary/15 text-primary">{initials}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{user.fullName}</p>
            <p className="text-xs text-muted-foreground truncate">{user.email}</p>
          </div>
          <Badge variant="outline" className={cn('text-[10px] rounded-full px-2 shrink-0', STATUS_STYLES[user.status])}>
            {user.status}
          </Badge>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">New Status</Label>
            <Select
              value={currentStatus}
              onValueChange={(v) => setValue('status', v as UserStatus)}
            >
              <SelectTrigger className="rounded-xl bg-white/5 border-border/60 h-9 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="glass-card border-border/60 rounded-xl">
                <SelectItem value="ACTIVE">Active</SelectItem>
                <SelectItem value="INACTIVE">Inactive</SelectItem>
                <SelectItem value="SUSPENDED">Suspended</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter className="gap-2 pt-2">
            <Button type="button" variant="ghost" onClick={onClose} className="rounded-xl">
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={currentStatus === user.status}
              className="rounded-xl"
            >
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}