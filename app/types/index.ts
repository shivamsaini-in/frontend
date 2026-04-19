export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'SUPER_ADMIN' | 'USER';
  isActive: boolean;
  lastLogin: string | null;
  createdAt: string;
  updatedAt: string;
}

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

export interface DashboardSummary {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  recentUsers: User[];
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthData {
  token: string;
  user: User;
}

export interface CreateUserPayload {
  name: string;
  email: string;
  password: string;
  role?: 'SUPER_ADMIN' | 'USER';
}

export interface UpdateUserPayload {
  name?: string;
  email?: string;
  password?: string;
  role?: 'USER';
  isActive?: boolean;
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
  usageTime: number; // minutes
  lastUsedAt: string | null;
}

export interface MobileAnalysisRecord {
  _id: string;
  userId: string;
  date: string;
  deviceInfo: DeviceInfo | null;
  appsUsage: AppUsageEntry[];
  totalScreenTime: number; // minutes
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
  user: User;
  records: MobileAnalysisRecord[];
  pagination: PaginatedResponse<MobileAnalysisRecord>['pagination'];
}
