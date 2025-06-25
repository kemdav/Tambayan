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

export default function AuthEmailSentCard() {
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();
  return (
    <div className="card w-100 lg:w-130 h-80">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-action-forest-green text text-4xl font-bold">
          Check your Email
        </h1>
        <p className="text-action-forest-green text-xs text-center">
          A password reset link has been sent to your email address.
        </p>
        <p className="text-action-forest-green text-xs text-center">
          Please check your inbox to proceed.
        </p>
      </div>

      <Button
        className="text-neutral-linen-white 
        bg-linear-to-r from-action-seafoam-green to-action-forest-green
         hover:from-action-seafoam-green/90 hover:to-action-forest-green/90 
         font-bold text-xl w-full mt-20"
      >
        Resend Link
      </Button>

      <div className="flex items-center justify-center">
        <p className="text-action-forest-green text-xs">
          Didn’t get the link? Check your spam or click to resend.
        </p>
      </div>
    </div>
  );
}
