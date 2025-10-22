import { NextResponse } from 'next/server';
import { loginAdmin, createDefaultAdmin } from '@/backend/controllers/adminController';

// Create default admin on first request
let initialized = false;

export async function POST(request: Request) {
  try {
    // Initialize default admin if not already done
    if (!initialized) {
      await createDefaultAdmin();
      initialized = true;
    }
    
    const { email, password } = await request.json();
    
    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }
    
    // Attempt login
    const result = await loginAdmin(email, password);
    
    if (result.success && result.token) {
      // Set cookie with token
      const response = NextResponse.json(
        { message: 'Login successful', admin: result.admin },
        { status: 200 }
      );
      
      // Set cookie with 1 hour expiry
      response.cookies.set('adminToken', result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60, // 1 hour
        path: '/'
      });
      
      return response;
    } else {
      return NextResponse.json(
        { error: result.error || 'Invalid credentials' },
        { status: 401 }
      );
    }
  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    );
  }
}