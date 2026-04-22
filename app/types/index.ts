// ─── Admin User (the logged-in admin) ────────────────────────────────────────

export interface User {
  _id: string;
  name: string;       // mapped from fullName by backend toSafeObject
  fullName: string;
  email: string;
  role: 'SUPER_ADMIN' | 'ADMIN';
  status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
  lastLogin: string | null;
  createdAt: string;
  updatedAt: string;
}

// ─── Mobile User (managed by admin) ─────────────────────────────────────────

export interface MobileUser {
  _id: string;
  fullName: string;
  email: string;
  plan: 'FREE' | 'PRO' | 'ELITE';
  platform: 'ios' | 'android';
  deviceType: 'ios' | 'android' | 'unknown';
  status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
  lastLogin: string | null;
  createdAt: string;
  updatedAt: string;
}

// ─── API shapes ───────────────────────────────────────────────────────────────

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface PaginatedResponse<T> {
  success: boolean;
  message: string;
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

// ─── Dashboard ───────────────────────────────────────────────────────────────

export interface DashboardSummary {
  totalUsers: number;
  activeUsers: number;
  newLast7Days: number;
  avgScoreToday: number;
}

// ─── Auth ────────────────────────────────────────────────────────────────────

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthData {
  token: string;
  user: User;
}

// ─── User management payloads ────────────────────────────────────────────────

export type UserStatus = 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';

export interface UpdateUserStatusPayload {
  status: UserStatus;
}

// ─── Mobile Analytics ─────────────────────────────────────────────────────────

export interface DeviceInfo {
  deviceName: string;
  osVersion: string;
  appVersion: string;
}

export interface AppUsageEntry {
  appName: string;
  packageName: string;
  usageTime: number;
  lastUsedAt: string | null;
}

export interface MobileAnalysisRecord {
  _id: string;
  userId: string;
  date: string;
  deviceInfo: DeviceInfo | null;
  appsUsage: AppUsageEntry[];
  totalScreenTime: number;
  createdAt: string;
  updatedAt: string;
}

export interface AnalyticsSummary {
  totalRecords: number;
  uniqueUsers: number;
  avgDailyScreenTimeMinutes: number;
  topApps: { appName: string; totalMinutes: number }[];
}

export interface UserAnalyticsResponse {
  user: MobileUser;
  records: MobileAnalysisRecord[];
  pagination: PaginatedResponse<MobileAnalysisRecord>['pagination'];
}