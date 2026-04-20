'use client';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { loginUser, logoutUser } from '@/app/services/authService';
import { useAuthStore } from '@/app/store/authStore';
import type { LoginCredentials } from '@/app/types';

export const useLogin = () => {
  const { setAuth } = useAuthStore();
  const router = useRouter();

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => loginUser(credentials),
    onSuccess: ({ token, user }) => {
      setAuth(token, user);
      toast.success(`Welcome back, ${user.name}!`);
      router.push('/dashboard');
    },
    onError: (error: unknown) => {
      const axiosError = error as { response?: { data?: { message?: string } }; message?: string };
      const message = axiosError?.response?.data?.message ?? axiosError?.message ?? 'Login failed. Please try again.';
      toast.error(message);
    },
  });
};

export const useLogout = () => {
  const { clearAuth } = useAuthStore();
  const router = useRouter();

  return useMutation({
    mutationFn: logoutUser,
    onSettled: () => {
      clearAuth();
      router.push('/');
    },
  });
};
