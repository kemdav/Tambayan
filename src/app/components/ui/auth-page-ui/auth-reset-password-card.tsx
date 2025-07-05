"use client";

import { Button } from "@/app/components/ui/general/button";
import { PasswordInput } from "@/app/components/ui/general/input/password-input";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AuthResetPasswordCard({ code }: { code: string | null }) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sessionReady, setSessionReady] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!code) {
      setError("The password reset link is invalid or missing. Please use the link sent to your email, or request a new one.");
      return;
    }
    setLoading(true);
    createClient().auth.exchangeCodeForSession(code)
      .then(({ error }) => {
        if (error) {
          setError("The password reset link is invalid or has expired. Please request a new one.");
        } else {
          setSessionReady(true);
        }
      })
      .finally(() => setLoading(false));
  }, [code]);

  const validatePassword = (password: string) => {
    if (password.length < 6) {
      return "Password must be at least 6 characters long.";
    }
    return null;
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    if (!sessionReady) {
      setError("Session is not ready. Please use the link from your email.");
      return;
    }
    const passwordError = validatePassword(newPassword);
    if (passwordError) {
      setError(passwordError);
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) {
        setError("Failed to update password. Please try again or request a new reset link.");
      } else {
        setSuccess(true);
        setTimeout(() => {
          router.push('/login?message=Password updated successfully. Please log in with your new password.');
        }, 2000);
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card w-100 lg:w-130 h-100">
      <div className="flex flex-col justify-center items-center">
        <h1 className="responsiveCardHeading">
          Set a new Password
        </h1>
        <p className="textAuthResponsive text-xs text-center">
          Create a strong password to keep your account secure.
        </p>
      </div>

      <form className="flex flex-col gap-5 mt-3" onSubmit={handleResetPassword}>
        <div>
          <p className="textAuthResponsive">New Password</p>
          <PasswordInput
            className="bg-secondary-light-moss/20"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            required
            minLength={6}
          />
        </div>
        <div>
          <p className="textAuthResponsive">Confirm New Password</p>
          <PasswordInput
            className="bg-secondary-light-moss/20"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {error && (
          <div className="text-red-500 text-sm text-center">{error}</div>
        )}
        {success && (
          <div className="text-green-600 text-sm text-center">
            Password updated successfully! Redirecting to login...
          </div>
        )}
        <Button
          className="text-neutral-linen-white \
          bg-linear-to-r from-action-seafoam-green to-action-forest-green\n           hover:from-action-seafoam-green/90 hover:to-action-forest-green/90 \
           font-bold text-xl w-full mt-6"
          type="submit"
          disabled={loading || success || !sessionReady}
        >
          {loading ? "Updating Password..." : "Reset Password"}
        </Button>
      </form>

      <div className="flex items-center justify-center">
        <p className="textAuthResponsive text-xs">
          Remembered your password?
        </p>
        <Button
          variant="link"
          className="textAuthResponsive"
          onClick={() => router.push("/login")}
        >
          Log in instead
        </Button>
      </div>
    </div>
  );
}
