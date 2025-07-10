// forgot-send-email-client.tsx
"use client"; // This component uses client-side hooks

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/app/components/ui/general/button";

// All the logic from your old page.tsx goes here
export default function ForgotSendEmailForm() {
  const supabase = createClient();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleResend = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    // IMPORTANT: Make sure your redirectTo URL is your actual deployed URL, not localhost
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`
    });
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
    }
  };

  return (
    <div className="card w-100 lg:w-130 h-80">
      <div className="flex flex-col justify-center items-center">
        <h1 className="responsiveCardHeading">Check your Email</h1>
        <p className="textAuthResponsive text-xs text-center">
          A password reset link has been sent to <b>{email}</b>.
        </p>
        <p className="textAuthResponsive text-xs text-center">
          Please check your inbox to proceed.
        </p>
      </div>
      {success && (
        <div className="text-green-600 text-sm text-center mt-2">Resent successfully!</div>
      )}
      {error && (
        <div className="text-red-500 text-sm text-center mt-2">{error}</div>
      )}
      <Button
        className="text-neutral-linen-white bg-linear-to-r from-action-seafoam-green to-action-forest-green hover:from-action-seafoam-green/90 hover:to-action-forest-green/90 font-bold text-xl w-full mt-20"
        onClick={handleResend}
        disabled={loading}
      >
        {loading ? "Resending..." : "Resend Link"}
      </Button>
      <div className="flex items-center justify-center">
        <p className="textAuthResponsive text-xs">
          Didn't get the link? Check your spam or click to resend.
        </p>
      </div>
    </div>
  );
}