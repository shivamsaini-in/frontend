'use client';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { useCreateUser, useUpdateUser } from '@/app/hooks/useUsers';
import { parseApiError } from '@/app/utils/errorParser';
import type { User } from '@/app/types';

const createSchema = z.object({
  name: z.string().min(2, 'At least 2 characters'),
  email: z.string().email('Enter a valid email'),
  password: z.string().min(6, 'At least 6 characters'),
  role: z.enum(['SUPER_ADMIN', 'USER']),
});

const editSchema = z.object({
  name: z.string().min(2, 'At least 2 characters').optional(),
  email: z.string().email('Enter a valid email').optional(),
  password: z.string().min(6, 'At least 6 characters').optional().or(z.literal('')),
  isActive: z.boolean().optional(),
});

type CreateFormData = z.infer<typeof createSchema>;
type EditFormData = z.infer<typeof editSchema>;

interface UserModalProps {
  open: boolean;
  onClose: () => void;
  editUser: User | null;
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-xs text-destructive mt-1">{message}</p>;
}

export function UserModal({ open, onClose, editUser }: UserModalProps) {
  const isEditing = editUser !== null;
  const createUser = useCreateUser();
  const updateUser = useUpdateUser();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const createForm = useForm<CreateFormData>({
    resolver: zodResolver(createSchema) as any,
    defaultValues: { name: '', email: '', password: '', role: 'USER' },
  });

  const editForm = useForm<EditFormData>({
    resolver: zodResolver(editSchema),
  });

  useEffect(() => {
    if (open) {
      if (editUser) {
        editForm.reset({ name: editUser.name, email: editUser.email, password: '', isActive: editUser.isActive });
      } else {
        createForm.reset({ name: '', email: '', password: '', role: 'USER' });
      }
    }
  }, [open, editUser]); // eslint-disable-line react-hooks/exhaustive-deps

  const isPending = createUser.isPending || updateUser.isPending;

  const handleCreate = createForm.handleSubmit((data: CreateFormData) => {
    createUser.mutate(data, {
      onSuccess: () => { toast.success('User created'); onClose(); },
      onError: (e) => toast.error(parseApiError(e)),
    });
  });

  const handleEdit = editForm.handleSubmit((data) => {
    if (!editUser) return;
    const payload = { ...data };
    if (!payload.password) delete payload.password;
    updateUser.mutate({ id: editUser._id, payload }, {
      onSuccess: () => { toast.success('User updated'); onClose(); },
      onError: (e) => toast.error(parseApiError(e)),
    });
  });

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-md glass-card border-border/60 rounded-2xl p-6">
        <DialogHeader className="mb-2">
          <DialogTitle className="text-base font-semibold">
            {isEditing ? 'Edit User' : 'New User'}
          </DialogTitle>
        </DialogHeader>

        {isEditing ? (
          <form onSubmit={handleEdit} className="space-y-4">
            {/* Name */}
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">Full Name</Label>
              <Input
                placeholder="Jane Doe"
                {...editForm.register('name')}
                className="rounded-xl bg-white/5 border-border/60 focus:border-primary/50 h-9 text-sm"
              />
              <FieldError message={editForm.formState.errors.name?.message} />
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">Email</Label>
              <Input
                type="email"
                placeholder="jane@example.com"
                {...editForm.register('email')}
                className="rounded-xl bg-white/5 border-border/60 focus:border-primary/50 h-9 text-sm"
              />
              <FieldError message={editForm.formState.errors.email?.message} />
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">
                New Password{' '}
                <span className="text-muted-foreground/50 font-normal">(leave blank to keep)</span>
              </Label>
              <Input
                type="password"
                placeholder="••••••••"
                {...editForm.register('password')}
                className="rounded-xl bg-white/5 border-border/60 focus:border-primary/50 h-9 text-sm"
              />
              <FieldError message={editForm.formState.errors.password?.message} />
            </div>

            {/* Active toggle */}
            <div className="flex items-center gap-3 py-1">
              <input
                type="checkbox"
                id="edit-isActive"
                className="h-4 w-4 rounded border-border/60 accent-primary cursor-pointer"
                {...editForm.register('isActive')}
              />
              <Label htmlFor="edit-isActive" className="text-sm cursor-pointer">
                Active account
              </Label>
            </div>

            <DialogFooter className="gap-2 pt-2">
              <Button type="button" variant="ghost" onClick={onClose} className="rounded-xl">
                Cancel
              </Button>
              <Button type="submit" disabled={isPending} className="rounded-xl">
                {isPending ? 'Saving…' : 'Save Changes'}
              </Button>
            </DialogFooter>
          </form>
        ) : (
          <form onSubmit={handleCreate} className="space-y-4">
            {/* Name */}
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">Full Name</Label>
              <Input
                placeholder="Jane Doe"
                {...createForm.register('name')}
                className="rounded-xl bg-white/5 border-border/60 focus:border-primary/50 h-9 text-sm"
              />
              <FieldError message={createForm.formState.errors.name?.message} />
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">Email</Label>
              <Input
                type="email"
                placeholder="jane@example.com"
                {...createForm.register('email')}
                className="rounded-xl bg-white/5 border-border/60 focus:border-primary/50 h-9 text-sm"
              />
              <FieldError message={createForm.formState.errors.email?.message} />
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">Password</Label>
              <Input
                type="password"
                placeholder="••••••••"
                {...createForm.register('password')}
                className="rounded-xl bg-white/5 border-border/60 focus:border-primary/50 h-9 text-sm"
              />
              <FieldError message={createForm.formState.errors.password?.message} />
            </div>

            {/* Role */}
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">Role</Label>
              <Select
                defaultValue="USER"
                onValueChange={(v: string | null) => { if (v) createForm.setValue('role', v as 'SUPER_ADMIN' | 'USER'); }}
              >
                <SelectTrigger className="rounded-xl bg-white/5 border-border/60 h-9 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="glass-card border-border/60 rounded-xl">
                  <SelectItem value="USER">User</SelectItem>
                  <SelectItem value="SUPER_ADMIN">Super Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <DialogFooter className="gap-2 pt-2">
              <Button type="button" variant="ghost" onClick={onClose} className="rounded-xl">
                Cancel
              </Button>
              <Button type="submit" disabled={isPending} className="rounded-xl">
                {isPending ? 'Creating…' : 'Create User'}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}