//login/page.tsx
"use client";
import AuthLoginCard from "@/app/components/ui/auth-page-ui/auth-login-card";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { login } from '../action'; // Make sure this import is correct

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // This is the correct implementation. It does NOT use 'supabase' directly.
  // Its only job is to prepare data and call the server action.
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    
    // This function call sends the data to your server action.
    await login(formData);

    setLoading(false);
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
        // Here we pass our corrected handleLogin function
        onSubmit={handleLogin}
        onForgotPassword={() => router.push("/forgot-password")}
        onSignUp={() => router.push("/register")}
      />
    </div>
  );
}