import { supabase } from '@/lib/supabaseClient';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const session = await getServerSession();

  if (!session || !session.user) {
    return NextResponse.json({ error: 'No session found' }, { status: 404 });
  }
  const { data, error: getProfileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('email', session.user.email)
    .single();

  if (getProfileError) {
    return NextResponse.json(
      { error: getProfileError.message },
      { status: 500 },
    );
  }

  if (!data) {
    return NextResponse.json({ error: 'No profiles found' }, { status: 404 });
  }

  return NextResponse.json(data);
}

// PATCH /api/admin/profile
export async function PATCH(request: NextRequest) {
  const session = await getServerSession();

  if (!session || !session.user) {
    return NextResponse.json({ error: 'No session found' }, { status: 404 });
  }

  const { name, bio } = await request.json();

  const { data, error: updateProfileError } = await supabase
    .from('profiles')
    .update({ name, bio, email: session.user.email })
    .eq('email', session.user.email);

  if (updateProfileError) {
    return NextResponse.json(
      { error: updateProfileError.message },
      { status: 500 },
    );
  }

  return NextResponse.json(data);
}
