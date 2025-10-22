import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Proxy function for Next.js 16
// Optimized version with early returns and streamlined logic
export default function proxy(request: NextRequest) {
  // Early return if not an admin route
  if (!request.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.next();
  }
  
  // Check for admin token in cookies (server-side only)
  const adminToken = request.cookies.get('adminToken')?.value;
  
  // Special handling for login page
  if (request.nextUrl.pathname === '/admin/login') {
    // If user already has a token, redirect to dashboard
    if (adminToken) {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }
    return NextResponse.next();
  }
  
  // Redirect users without admin token trying to access admin pages
  if (!adminToken) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }
  
  return NextResponse.next();
}

// Configure which paths the proxy should run on
export const config = {
  matcher: ['/admin/:path*'],
};