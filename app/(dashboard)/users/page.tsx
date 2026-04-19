'use client';
import { useState, useCallback } from 'react';
import { useUsers, useDeleteUser } from '@/app/hooks/useUsers';
import { UserTable } from '@/app/components/users/UserTable';
import { UserModal } from '@/app/components/users/UserModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search } from 'lucide-react';
import { toast } from 'sonner';
import { parseApiError } from '@/app/utils/errorParser';
import { useDebounce } from '@/app/hooks/useDebounce';
import type { User } from '@/app/types';

export default function UsersPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 400);
  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<User | null>(null);

  const { data, isLoading } = useUsers({
    page,
    limit: 10,
    search: debouncedSearch || undefined,
  });

  const deleteUser = useDeleteUser();

  const handleDelete = useCallback(
    (id: string) => {
      if (!confirm('Delete this user? This cannot be undone.')) return;
      deleteUser.mutate(id, {
        onSuccess: () => toast.success('User deleted'),
        onError: (e) => toast.error(parseApiError(e)),
      });
    },
    [deleteUser]
  );

  const handleEdit = useCallback((user: User) => {
    setEditTarget(user);
    setModalOpen(true);
  }, []);

  return (
    <div className="space-y-6 w-full">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Users</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {isLoading ? '—' : `${data?.pagination.total ?? 0} total accounts`}
          </p>
        </div>
        <Button
          onClick={() => { setEditTarget(null); setModalOpen(true); }}
          className="rounded-xl gap-2 shrink-0"
        >
          <Plus className="h-4 w-4" />
          Add User
        </Button>
      </div>

      {/* Search */}
      <div className="relative w-full sm:w-72">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
        <Input
          placeholder="Search name or email…"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          className="pl-9 rounded-xl bg-white/5 border-border/60 focus:border-primary/50 h-9 text-sm"
        />
      </div>

      {/* Table */}
      <UserTable
        users={data?.data ?? []}
        pagination={data?.pagination}
        isLoading={isLoading}
        page={page}
        onPageChange={setPage}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <UserModal
        open={modalOpen}
        onClose={() => { setModalOpen(false); setEditTarget(null); }}
        editUser={editTarget}
      />
    </div>
  );
}