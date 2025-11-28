import { SupabaseClient, UserAttributes } from "@supabase/supabase-js";

type LoggedIn = {
  user: UserAttributes | null;
  isLogin: boolean;
};
export async function isLoggedIn(supabase: SupabaseClient): Promise<LoggedIn> {
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    return { user: null, isLogin: false };
  }

  return { user: data.user, isLogin: !!data.user };
}
