"use client";

import { TambayanIcon } from "../../icons";
import { Button } from "@/app/components/ui/button";
import { PasswordInput } from "../password-input";
import { Input } from "../input";
import { SearchIcon } from "lucide-react";
import { UserPofileLoginIcon } from "../../icons";
import CheckboxComponent from "@/app/components/ui/checkbox-component";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthLoginCard() {
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();
  return (
    <div className="card w-130 h-100">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-action-forest-green text text-4xl font-bold">
          Log In to Your Account
        </h1>
        <p className="text-action-forest-green text-xs">
          Please sign in to proceed
        </p>
      </div>

      <div className="flex flex-col gap-5 mt-3">
        <div>
          <p className="text-action-forest-green">Email</p>
          <Input
            rightIcon={<UserPofileLoginIcon />}
            className="bg-secondary-light-moss/20"
          ></Input>
        </div>
        <div>
          <p className="text-action-forest-green">Password</p>
          <PasswordInput className="bg-secondary-light-moss/20"></PasswordInput>
        </div>
      </div>

      <div className="flex items-center justify-between">
        {/*TODO put the actual checkbox component here*/}
        <CheckboxComponent
          text={
            <span style={{ color: "var(--color-action-forest-green )" }}>
              Remember me
            </span>
          }
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
        />
        <Button
          variant="link"
          className="text-action-forest-green text-xs"
          onClick={() => router.push("/forgot-password")}
        >
          Forgot your password?
        </Button>
      </div>

      <Button
        className="text-neutral-linen-white 
        bg-linear-to-r from-action-seafoam-green to-action-forest-green
         hover:from-action-seafoam-green/90 hover:to-action-forest-green/90 
         font-bold text-xl w-full mt-3"
      >
        Log In
      </Button>

      <div className="flex items-center justify-center">
        <p className="text-action-forest-green">Don't have an account?</p>
        <Button
          variant="link"
          className="text-action-forest-green"
          onClick={() => router.push("register")}
        >
          Sign up
        </Button>
      </div>
    </div>
  );
}
