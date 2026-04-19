import Link from 'next/link';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Pencil, Trash2, ChevronLeft, ChevronRight, BarChart2, Users } from 'lucide-react';
import type { User, PaginatedResponse } from '@/app/types';
import { formatDate } from '@/app/utils/formatDate';
import { cn } from '@/lib/utils';

interface UserTableProps {
  users: User[];
  pagination?: PaginatedResponse<User>['pagination'];
  isLoading: boolean;
  page: number;
  onPageChange: (page: number) => void;
  onEdit: (user: User) => void;
  onDelete: (id: string) => void;
}

export function UserTable({
  users,
  pagination,
  isLoading,
  page,
  onPageChange,
  onEdit,
  onDelete,
}: UserTableProps) {
  return (
    <div className="space-y-4">
      <div className="glass-card rounded-2xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-border/60 hover:bg-transparent">
              <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wider pl-5">
                User
              </TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Role
              </TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Status
              </TableHead>
              <TableHead className="hidden md:table-cell text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Last Login
              </TableHead>
              <TableHead className="text-right pr-5 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading ? (
              Array.from({ length: 8 }).map((_, i) => (
                <TableRow key={i} className="border-border/40">
                  <TableCell className="pl-5">
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-8 w-8 rounded-full bg-white/5 shrink-0" />
                      <div className="space-y-1.5">
                        <Skeleton className="h-3.5 w-24 bg-white/5" />
                        <Skeleton className="h-3 w-36 bg-white/5" />
                      </div>
                    </div>
                  </TableCell>
                  {Array.from({ length: 4 }).map((_, j) => (
                    <TableCell key={j}>
                      <Skeleton className="h-4 w-16 bg-white/5" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="py-16 text-center">
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <Users className="h-8 w-8 opacity-30" />
                    <p className="text-sm">No users found</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => {
                const initials = user.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .toUpperCase()
                  .slice(0, 2);

                return (
                  <TableRow
                    key={user._id}
                    className="border-border/40 hover:bg-white/3 transition-colors"
                  >
                    {/* User cell */}
                    <TableCell className="pl-5 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8 shrink-0">
                          <AvatarFallback className="text-[10px] font-semibold bg-primary/15 text-primary">
                            {initials}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                          <p className="text-sm font-medium leading-none truncate">{user.name}</p>
                          <p className="text-xs text-muted-foreground mt-1 truncate">{user.email}</p>
                        </div>
                      </div>
                    </TableCell>

                    {/* Role */}
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={cn(
                          'text-[10px] rounded-full px-2 border-0',
                          user.role === 'SUPER_ADMIN'
                            ? 'bg-primary/15 text-primary'
                            : 'bg-white/5 text-muted-foreground'
                        )}
                      >
                        {user.role === 'SUPER_ADMIN' ? 'Admin' : 'User'}
                      </Badge>
                    </TableCell>

                    {/* Status */}
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        <span
                          className={cn(
                            'h-1.5 w-1.5 rounded-full shrink-0',
                            user.isActive ? 'bg-emerald-400' : 'bg-muted-foreground'
                          )}
                        />
                        <span className="text-xs text-muted-foreground">
                          {user.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </TableCell>

                    {/* Last login */}
                    <TableCell className="hidden md:table-cell text-xs text-muted-foreground">
                      {formatDate(user.lastLogin)}
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="text-right pr-4">
                      <div className="flex items-center justify-end gap-0.5">
                        <Link href={`/users/${user._id}`}>
                          <Button
                            variant="ghost"
                            size="icon"
                            title="View analytics"
                            className="h-8 w-8 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10"
                          >
                            <BarChart2 className="h-3.5 w-3.5" />
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onEdit(user)}
                          title="Edit user"
                          className="h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/5"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onDelete(user._id)}
                          disabled={user.role === 'SUPER_ADMIN'}
                          title={user.role === 'SUPER_ADMIN' ? 'Cannot delete admin' : 'Delete user'}
                          className="h-8 w-8 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 disabled:opacity-30"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-between px-1">
          <p className="text-xs text-muted-foreground">
            Page {pagination.page} of {pagination.totalPages} &mdash; {pagination.total} users
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={!pagination.hasPrevPage}
              onClick={() => onPageChange(page - 1)}
              className="h-8 rounded-lg border-border/60 bg-white/5 hover:bg-white/8 text-xs gap-1"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
              Prev
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={!pagination.hasNextPage}
              onClick={() => onPageChange(page + 1)}
              className="h-8 rounded-lg border-border/60 bg-white/5 hover:bg-white/8 text-xs gap-1"
            >
              Next
              <ChevronRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}