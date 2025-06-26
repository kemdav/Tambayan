"use client";

import { TambayanIcon } from "../../icons";
import { Button } from "@/app/components/ui/general/button";
import { Input } from "@/app/components/ui/general/input/input";
import { EmailIcon } from "../../icons";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthEnterEmailCard() {
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();
  return (
    <div className="card w-100 lg:w-130 h-80">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-action-forest-green text text-4xl font-bold">
          Reset Password
        </h1>
        <p className="text-action-forest-green text-xs text-center">
          Enter your email address and we’ll send you a link to reset your
          password.
        </p>
      </div>

      <div className="flex flex-col gap-5 mt-6">
        <div>
          <p className="text-action-forest-green">Email Address</p>
          <Input
            rightIcon={<EmailIcon className="size-6" />}
            className="bg-secondary-light-moss/20"
          ></Input>
        </div>
      </div>

      <Button
        className="text-neutral-linen-white 
        bg-linear-to-r from-action-seafoam-green to-action-forest-green
         hover:from-action-seafoam-green/90 hover:to-action-forest-green/90 
         font-bold text-xl w-full mt-8"
        onClick={() => router.push("forgot-send-email")}
      >
        Reset Password
      </Button>

      <div className="flex items-center justify-center">
        <p className="text-action-forest-green text-sm">Remembered your password?</p>
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
