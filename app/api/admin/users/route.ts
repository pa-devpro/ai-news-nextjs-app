import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdminClient';
import { supabase } from '@/lib/supabaseClient';
import { Profile } from '@/lib/types/supabase-types';
import { PostgrestError } from '@supabase/supabase-js';

type ProfilesResponse = {
  data: Profile[] | null;
  error: PostgrestError | null;
};

/**
 * Handles the GET request to fetch all profiles from the 'profiles' table.
 * @returns JSON response containing all profiles
 */
export async function GET() {
  const { data, error }: ProfilesResponse = await supabase
    .from('profiles')
    .select('*');

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (!data) {
    return NextResponse.json({ error: 'No profiles found' }, { status: 404 });
  }

  return NextResponse.json(data);
}

/**
 * DELETE /api/admin/users
 * Deletes a user from both auth.users and public.profiles tables
 * We use the admin client to delete the user from auth.users amd the regular client to delete the user from public.profiles
 * @param request - Contains userId in the request body
 * @returns JSON response indicating success or error
 */
export async function DELETE(request: Request) {
  // Extract userId from request body
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  // Step 1: Delete user from auth.users
  const { error } = await supabaseAdmin.auth.admin.deleteUser(userId, true);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Step 2: Delete user from public.profiles
  const { error: errorDeletingProfile } = await supabase
    .from('profiles')
    .delete()
    .eq('id', userId);

  if (errorDeletingProfile) {
    return NextResponse.json(
      { error: errorDeletingProfile.message },
      { status: 500 },
    );
  }

  // Return success response
  return NextResponse.json({ success: true });
}
