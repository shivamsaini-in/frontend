import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  type GetUsersParams,
} from '@/app/services/userService';
import type { CreateUserPayload, UpdateUserPayload } from '@/app/types';

export const useUsers = (params: GetUsersParams) =>
  useQuery({
    queryKey: ['users', params],
    queryFn: () => getUsers(params),
    placeholderData: (prev) => prev,
  });

export const useCreateUser = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateUserPayload) => createUser(payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['users'] }),
  });
};

export const useUpdateUser = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateUserPayload }) =>
      updateUser(id, payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['users'] }),
  });
};

export const useDeleteUser = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteUser(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['users'] }),
  });
};
