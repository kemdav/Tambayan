"use client";

import { Button } from "@/app/components/ui/general/button";
import { PasswordInput } from "@/app/components/ui/general/input/password-input";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthResetPasswordCard() {
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();
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

      <div className="flex flex-col gap-5 mt-3">
        <div>
          <p className="textAuthResponsive">New Password</p>
          <PasswordInput className="bg-secondary-light-moss/20"></PasswordInput>
        </div>
        <div>
          <p className="textAuthResponsive">Confirm New Password</p>
          <PasswordInput className="bg-secondary-light-moss/20"></PasswordInput>
        </div>
      </div>

      <Button
        className="text-neutral-linen-white 
        bg-linear-to-r from-action-seafoam-green to-action-forest-green
         hover:from-action-seafoam-green/90 hover:to-action-forest-green/90 
         font-bold text-xl w-full mt-6"
      >
        Reset Password
      </Button>

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
