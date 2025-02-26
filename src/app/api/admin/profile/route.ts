import { getSupabaseWithUserAuth } from '@/lib/supabaseClient';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');
  const req = await request.json();
  const token = req.token;
  const supabase = getSupabaseWithUserAuth(token);

  if (!email) {
    return NextResponse.json(
      { error: 'Email parameter is required' },
      { status: 400 },
    );
  }

  const { data: profileData, error: getProfileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('email', email)
    .single();

  if (getProfileError) {
    return NextResponse.json(
      { error: getProfileError.message },
      { status: 500 },
    );
  }

  if (!profileData) {
    return NextResponse.json({ error: 'No profile found' }, { status: 404 });
  }
  return NextResponse.json(profileData);
}

export async function PATCH(request: NextRequest) {
  const req = await request.json();

  const { name, bio, email } = req.data;
  const token = req.token;
  const supabase = getSupabaseWithUserAuth(token);

  const { data, error: updateProfileError } = await supabase
    .from('profiles')
    .update({ name, bio, email })
    .eq('email', email)
    .select('*');

  if (updateProfileError) {
    return NextResponse.json(
      { error: updateProfileError.message },
      { status: 500 },
    );
  }

  return NextResponse.json(data);
}
