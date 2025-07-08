import { NextRequest, NextResponse } from 'next/server';
import { resetStudentPasswordToDefault } from '@/lib/actions/student';

export async function POST(req: NextRequest) {
  const { user_id } = await req.json();
  if (!user_id) {
    return NextResponse.json({ error: 'Missing user_id' }, { status: 400 });
  }
  const { data, error } = await resetStudentPasswordToDefault(user_id);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ success: true });
} 