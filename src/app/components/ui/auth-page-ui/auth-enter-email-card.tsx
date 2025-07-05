"use client";

import { TambayanIcon } from "../../icons";
import { Button } from "@/app/components/ui/general/button";
import { Input } from "@/app/components/ui/general/input/input";
import { EmailIcon } from "../../icons";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface AuthEnterEmailCardProps {
  email: string;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onReset: () => void;
  loading: boolean;
  error: string | null;
  onLogin: () => void;
}

export default function AuthEnterEmailCard({
  email,
  onEmailChange,
  onReset,
  loading,
  error,
  onLogin,
}: AuthEnterEmailCardProps) {
  return (
    <div className="card w-100 lg:w-130 h-80">
      <div className="flex flex-col justify-center items-center">
        <h1 className="responsiveCardHeading">
          Reset Password
        </h1>
        <p className="textAuthResponsive text-xs text-center">
          Enter your email address and we'll send you a link to reset your
          password.
        </p>
      </div>

      <div className="flex flex-col gap-5 mt-6">
        <div>
          <p className="textAuthResponsive">Email Address</p>
          <Input
            rightIcon={<EmailIcon className="size-6" />}
            className="bg-secondary-light-moss/20"
            value={email}
            onChange={onEmailChange}
            type="email"
            required
          />
        </div>
      </div>

      {error && (
        <div className="text-red-500 text-sm text-center mt-2">{error}</div>
      )}

      <Button
        className="text-neutral-linen-white \
        bg-linear-to-r from-action-seafoam-green to-action-forest-green\n         hover:from-action-seafoam-green/90 hover:to-action-forest-green/90 \
         font-bold text-xl w-full mt-8"
        onClick={onReset}
        disabled={loading}
      >
        {loading ? "Sending..." : "Reset Password"}
      </Button>

      <div className="flex items-center justify-center">
        <p className="textAuthResponsive text-sm">Remembered your password?</p>
        <Button
          variant="link"
          className="textAuthResponsive"
          onClick={onLogin}
        >
          Log in instead
        </Button>
      </div>
    </div>
  );
}
