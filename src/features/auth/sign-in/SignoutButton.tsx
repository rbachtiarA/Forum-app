"use client";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SignoutButton() {
  const queryClient = useQueryClient();
  const supabase = createClient();
  const router = useRouter();
  const onLogout = () => {
    queryClient.clear();
    supabase.auth.signOut();
    router.push("/sign-in");
  };

  return (
    <Button
      onClick={onLogout}
      variant={"destructive"}
      className="flex w-full gap-2"
    >
      <LogOutIcon />
      Logout
    </Button>
  );
}
