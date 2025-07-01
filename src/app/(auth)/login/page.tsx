"use client";
import AuthLoginCard from "@/app/components/ui/auth-page-ui/auth-login-card";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      router.push("/profile"); // TODO: Change to your actual post-login route
    }
  };

  return (
    <div className="flex items-center justify-center">
      <AuthLoginCard
        email={email}
        password={password}
        rememberMe={rememberMe}
        loading={loading}
        error={error}
        onEmailChange={e => setEmail(e.target.value)}
        onPasswordChange={e => setPassword(e.target.value)}
        onRememberMeChange={e => setRememberMe(e.target.checked)}
        onSubmit={handleLogin}
        onForgotPassword={() => router.push("/forgot-password")}
        onSignUp={() => router.push("register")}
      />
    </div>
  );
}
