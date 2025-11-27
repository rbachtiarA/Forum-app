"use client";

import { createClient } from "@/lib/supabase/client";
import { isLoggedIn } from "@/utils/isLoggedIn";
import { useQuery } from "@tanstack/react-query";

const fetchAuth = async () => {
  const supabase = createClient();
  const { user, isLogin } = await isLoggedIn(supabase);
  return user;
};

export const useAuth = () => {
  return useQuery({
    queryKey: ["Auth"],
    queryFn: fetchAuth,
    staleTime: 1000 * 15,
    retry: false,
    refetchOnWindowFocus: false,
  });
};
