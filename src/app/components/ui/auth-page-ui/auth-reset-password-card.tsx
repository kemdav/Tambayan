"use client";

import { TambayanIcon } from "../../icons";
import { Button } from "@/app/components/ui/button";
import { PasswordInput } from "../password-input";
import { Input } from "../input";
import { SearchIcon } from "lucide-react";
import { EmailIcon } from "../../icons";
import CheckboxComponent from "@/app/components/ui/checkbox-component";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthResetPasswordCard() {
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();
  return (
    <div className="card w-100 lg:w-130 h-100">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-action-forest-green text text-3xl lg:text-4xl font-bold">
          Set a new Password
        </h1>
        <p className="text-action-forest-green text-xs text-center">
          Create a strong password to keep your account secure.
        </p>
      </div>

      <div className="flex flex-col gap-5 mt-3">
        <div>
          <p className="text-action-forest-green">New Password</p>
          <PasswordInput className="bg-secondary-light-moss/20"></PasswordInput>
        </div>
        <div>
          <p className="text-action-forest-green">Confirm New Password</p>
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
        <p className="text-action-forest-green text-xs">
          Remembered your password?
        </p>
        <Button
          variant="link"
          className="text-action-forest-green"
          onClick={() => router.push("/login")}
        >
          Log in instead
        </Button>
      </div>
    </div>
  );
}
