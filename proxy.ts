import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Routes accessible without a token
const PUBLIC_PREFIXES = ['/', '/login'];

// Routes that require a token
const PROTECTED_PREFIXES = ['/dashboard'];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('auth-token')?.value;

  const isProtected = PROTECTED_PREFIXES.some((p) => pathname === p || pathname.startsWith(p + '/'));
  const isLogin = pathname.startsWith('/login');

  // Unauthenticated user hitting a protected route → send to login
  if (!token && isProtected) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Authenticated user hitting /login → send to dashboard
  if (token && isLogin) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|public).*)'],
};
