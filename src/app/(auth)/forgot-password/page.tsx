"use client";
import AuthEnterEmailCard from "@/app/components/ui/auth-page-ui/auth-enter-email-card";
import { createClient } from "@/lib/supabase/client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleReset = async () => {
    setLoading(true);
    setError(null);
    
    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://127.0.0.1:3000/reset-password"
    });
    
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      router.push(`/forgot-send-email?email=${encodeURIComponent(email)}`);
    }
  };

  return (
    <AuthEnterEmailCard
      email={email}
      onEmailChange={e => setEmail(e.target.value)}
      onReset={handleReset}
      loading={loading}
      error={error}
      onLogin={() => router.push("/login")}
    />
  );
}
