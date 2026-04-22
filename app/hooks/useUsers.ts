'use client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getUsers,
  updateUserStatus,
  type GetUsersParams,
} from '@/app/services/userService';
import type { UpdateUserStatusPayload } from '@/app/types';

export const useUsers = (params: GetUsersParams) =>
  useQuery({
    queryKey: ['users', params],
    queryFn: () => getUsers(params),
    placeholderData: (prev) => prev,
  });

export const useUpdateUserStatus = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateUserStatusPayload }) =>
      updateUserStatus(id, payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['users'] }),
  });
};