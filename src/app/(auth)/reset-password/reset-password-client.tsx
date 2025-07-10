// reset-password-client.tsx
'use client';

import AuthResetPasswordCard from "@/app/components/ui/auth-page-ui/auth-reset-password-card";
import { useSearchParams } from "next/navigation";

// All the logic from your old page.tsx goes here.
export default function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  return (
    <div className="flex items-center justify-center">
      {/* Pass the code down as a prop. 
          AuthResetPasswordCard might not even need the 'code' directly if it handles
          the password update via supabase.auth.updateUser(), but this is a clean pattern. */}
      <AuthResetPasswordCard code={code} />
    </div>
  );
}