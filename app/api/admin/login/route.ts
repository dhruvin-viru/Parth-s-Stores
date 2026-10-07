import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { email, password } = body || {};

    const expectedEmail = process.env.ADMIN_EMAIL || 'dhruvinviradiya1543@gmail.com';
    const expectedPassword = process.env.ADMIN_PASSWORD || 'Dhruvin@1583';

    if (email === expectedEmail && password === expectedPassword) {
      const cookieStore = cookies();
      const token = Buffer.from(`${email}:${Date.now()}`).toString('base64');

      cookieStore.set('admin_session', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7 // 7 days
      });

      return NextResponse.json({ 
        success: true, 
        message: 'Admin authenticated successfully',
        token 
      });
    }

    return NextResponse.json({ 
      error: 'Unauthorized', 
      success: false, 
      message: 'Invalid email or password' 
    }, { status: 401 });
  } catch (error: any) {
    return NextResponse.json({ 
      error: 'Server error during authentication', 
      success: false 
    }, { status: 500 });
  }
}
