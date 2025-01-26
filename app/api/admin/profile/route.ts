import { supabase } from '@/lib/supabaseClient';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

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
