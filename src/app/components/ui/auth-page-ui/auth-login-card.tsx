"use client";

import { Button } from "@/app/components/ui/general/button";
import { PasswordInput } from "@/app/components/ui/general/input/password-input";
import { Input } from "@/app/components/ui/general/input/input";
import { UserPofileLoginIcon } from "../../icons";
import CheckboxComponent from "@/app/components/ui/general/checkbox-component";
import React from "react";

interface AuthLoginCardProps {
  email: string;
  password: string;
  rememberMe: boolean;
  loading: boolean;
  error: string | null;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRememberMeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onForgotPassword: () => void;
  onSignUp: () => void;
}

export default function AuthLoginCard({
  email,
  password,
  rememberMe,
  loading,
  error,
  onEmailChange,
  onPasswordChange,
  onRememberMeChange,
  onSubmit,
  onForgotPassword,
  onSignUp,
}: AuthLoginCardProps) {
  return (
    <div className="card w-100 md:w-130 lg:w-130 h-110">
      <div className="flex flex-col justify-center items-center">
        <h1 className="responsiveCardHeading text-center mb-2">
          Log In to Your Account
        </h1>
        <p className="textAuthResponsive text-s text-center">
          Please sign in to proceed
        </p>
      </div>

      <form className="flex flex-col mt-4" onSubmit={onSubmit}>
        <div>
          <p className="textAuthResponsive mb-1">Email</p>
          <Input
            rightIcon={<UserPofileLoginIcon />}
            className="bg-secondary-light-moss/20"
            name="email"
            value={email}
            onChange={onEmailChange}
            type="email"
            required
          />
        </div>
        <div>
          <p className="textAuthResponsive mb-1 mt-5">Password</p>
          <PasswordInput
            className="bg-secondary-light-moss/20"
            name="password"
            value={password}
            onChange={onPasswordChange}
            required
          />
        </div>

        <div className="flex items-center justify-between">
          <CheckboxComponent
            text={
              <span style={{ color: "var(--color-action-forest-green )" }}>
                Remember me
              </span>
            }
            checked={rememberMe}
            onChange={onRememberMeChange}
          />
          <Button
            variant="link"
            className="textAuthResponsive text-sm p-0"
            type="button"
            onClick={onForgotPassword}
          >
            Forgot your password?
          </Button>
        </div>

        {error && (
          <div className="text-red-500 text-sm text-center">{error}</div>
        )}

        <Button
          className="text-neutral-linen-white bg-linear-to-r from-action-seafoam-green to-action-forest-green hover:from-action-seafoam-green/90 hover:to-action-forest-green/90 font-bold text-xl w-full mt-5 transition-colors duration-300"
          type="submit"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Log In"}
        </Button>
      </form>

      <div className="flex items-center justify-center">
        <p className="textAuthResponsive">Don't have an account?</p>
        <Button
          variant="link"
          className="textAuthResponsive pl-1"
          onClick={onSignUp}
        >
          Sign up
        </Button>
      </div>
    </div>
  );
}
