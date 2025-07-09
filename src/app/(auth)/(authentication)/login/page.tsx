//login/page.tsx
"use client";
import AuthLoginCard from "@/app/components/ui/auth-page-ui/auth-login-card";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { login } from "../action"; // Make sure this import is correct

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search)
      : null;

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedRememberMe = localStorage.getItem("rememberMe");
      if (savedRememberMe === "true") {
        setRememberMe(true);
        const savedEmail = localStorage.getItem("savedEmail");
        if (savedEmail) {
          setEmail(savedEmail);
        }
      }
    }
  }, []);

  useEffect(() => {
    if (searchParams) {
      const message = searchParams.get("message");
      if (message) setError(message);
    }
  }, []);

  // Handle remember me checkbox change
  const handleRememberMeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setRememberMe(checked);

    // Save to localStorage
    if (typeof window !== "undefined") {
      if (checked) {
        localStorage.setItem("rememberMe", "true");
        // Save current email when remember me is checked
        if (email) {
          localStorage.setItem("savedEmail", email);
        }
      } else {
        localStorage.removeItem("rememberMe");
        localStorage.removeItem("savedEmail");
      }
    }
  };

  // Handle email change to save it when remember me is checked
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);

    // Save email to localStorage if remember me is checked
    if (rememberMe && typeof window !== "undefined") {
      localStorage.setItem("savedEmail", newEmail);
    }
  };

  // This is the correct implementation. It does NOT use 'supabase' directly.
  // Its only job is to prepare data and call the server action.
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("rememberMe", rememberMe.toString());

    const result = await login(formData);
    if (result && result.error) {
      setError(result.error);
    } else {
      // Success: redirect to home or dashboard
      router.push("/");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent">
      <AuthLoginCard
        email={email}
        password={password}
        rememberMe={rememberMe}
        loading={loading}
        error={error}
        onEmailChange={handleEmailChange}
        onPasswordChange={(e) => setPassword(e.target.value)}
        onRememberMeChange={handleRememberMeChange}
        // Here we pass our corrected handleLogin function
        onSubmit={handleLogin}
        onForgotPassword={() => router.push("/forgot-password")}
        onSignUp={() => router.push("/register")}
      />
    </div>
  );
}
