'use client';
import { useState, useCallback } from 'react';
import { useUsers, useUpdateUserStatus } from '@/app/hooks/useUsers';
import { UserTable } from '@/app/components/users/UserTable';
import { UserModal } from '@/app/components/users/UserModal';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { parseApiError } from '@/app/utils/errorParser';
import { useDebounce } from '@/app/hooks/useDebounce';
import type { MobileUser, UserStatus } from '@/app/types';

export default function UsersPage() {
  const [page, setPage]           = useState(1);
  const [search, setSearch]       = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const debouncedSearch           = useDebounce(search, 400);
  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<MobileUser | null>(null);

  const { data, isLoading } = useUsers({
    page,
    limit: 10,
    search: debouncedSearch || undefined,
    status: statusFilter || undefined,
  });

  const updateStatus = useUpdateUserStatus();

  const handleStatusChange = useCallback((id: string, status: UserStatus) => {
    updateStatus.mutate({ id, payload: { status } }, {
      onSuccess: () => toast.success(`User ${status.toLowerCase()}`),
      onError:   (e) => toast.error(parseApiError(e)),
    });
  }, [updateStatus]);

  const handleEdit = useCallback((user: MobileUser) => {
    setEditTarget(user);
    setModalOpen(true);
  }, []);

  return (
    <div className="space-y-6 w-full">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Mobile Users</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {isLoading ? '—' : `${data?.pagination.total ?? 0} total accounts`}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
          <Input
            placeholder="Search name or email…"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="pl-9 rounded-xl bg-white/5 border-border/60 focus:border-primary/50 h-9 text-sm"
          />
        </div>
        <Select
          value={statusFilter || 'ALL'}
          onValueChange={(v) => { setStatusFilter(v === 'ALL' ? '' : (v ?? '')); setPage(1); }}
        >
          <SelectTrigger className="w-36 h-9 rounded-xl bg-white/5 border-border/60 text-sm">
            <SelectValue placeholder="All statuses" />
          </SelectTrigger>
          <SelectContent className="glass-card border-border/60 rounded-xl">
            <SelectItem value="ALL">All statuses</SelectItem>
            <SelectItem value="ACTIVE">Active</SelectItem>
            <SelectItem value="INACTIVE">Inactive</SelectItem>
            <SelectItem value="SUSPENDED">Suspended</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <UserTable
        users={data?.data ?? []}
        pagination={data?.pagination}
        isLoading={isLoading}
        page={page}
        onPageChange={setPage}
        onEdit={handleEdit}
        onStatusChange={handleStatusChange}
      />

      <UserModal
        open={modalOpen}
        onClose={() => { setModalOpen(false); setEditTarget(null); }}
        user={editTarget}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
}