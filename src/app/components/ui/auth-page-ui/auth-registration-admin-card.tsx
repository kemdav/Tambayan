"use client";

import { Button } from "@/app/components/ui/general/button";
import { PasswordInput } from "@/app/components/ui/general/input/password-input";
import { Input } from "@/app/components/ui/general/input/input";
import { EmailIcon } from "../../icons";
import React from "react";

interface AuthRegistrationAdminCardProps {
  universityName: string;
  universityEmail: string;
  universityContact: string;
  password: string;
  confirmPassword: string;
  loading: boolean;
  error: string | null;
  onUniversityNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onUniversityEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onUniversityContactChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onConfirmPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onLogin: () => void;
}

export default function AuthRegistrationAdminCard({
  universityName,
  universityEmail,
  universityContact,
  password,
  confirmPassword,
  loading,
  error,
  onUniversityNameChange,
  onUniversityEmailChange,
  onUniversityContactChange,
  onPasswordChange,
  onConfirmPasswordChange,
  onSubmit,
  onLogin,
}: AuthRegistrationAdminCardProps) {
  return (
    <div className="card w-100 lg:w-130 h-138 p-5 lg:p-10 overflow-auto lg:overflow-visible">
      <div className="flex flex-col justify-center items-center mb-5">
        <h1 className="responsiveCardHeading mb-2">University Registration</h1>
        <p className="textAuthResponsive text-sm">
          Enter your university's information to register as an administrator.
        </p>
      </div>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <p className="textAuthResponsive">University Name</p>
          <Input
            className="inputAuthResponsive"
            value={universityName}
            onChange={onUniversityNameChange}
            required
          />
        </div>
        <div className="mb-3">
          <p className="textAuthResponsive">University Email</p>
          <Input
            rightIcon={<EmailIcon className="size-6" />}
            className="inputAuthResponsive"
            value={universityEmail}
            onChange={onUniversityEmailChange}
            type="email"
            required
          />
        </div>
        <div className="mb-3">
          <p className="textAuthResponsive">University Contact Number</p>
          <Input
            className="inputAuthResponsive"
            value={universityContact}
            onChange={onUniversityContactChange}
            type="tel"
            required
          />
        </div>
        <div className="grid grid-row-2 lg:gap-3 lg:mt-3 lg:flex">
          <div className="mb-3 lg:mb-0">
            <p className="textAuthResponsive">Password</p>
            <PasswordInput
              className="inputAuthResponsive"
              value={password}
              onChange={onPasswordChange}
              required
            />
          </div>
          <div>
            <p className="textAuthResponsive">Confirm Password</p>
            <PasswordInput
              className="inputAuthResponsive"
              value={confirmPassword}
              onChange={onConfirmPasswordChange}
              required
            />
          </div>
        </div>
        {error && (
          <div className="text-red-500 text-sm text-center mt-2">{error}</div>
        )}
        <Button
          className="text-neutral-linen-white bg-linear-to-r from-action-seafoam-green to-action-forest-green hover:from-action-seafoam-green/90 hover:to-action-forest-green/90 font-bold text-xl w-full mt-5 lg:mt-6"
          type="submit"
          disabled={loading}
        >
          {loading ? "Signing up..." : "Sign Up"}
        </Button>
      </form>
      <div className="flex items-center justify-center mt-4">
        <p className="textAuthResponsive">Already have an account?</p>
        <Button
          variant="link"
          className="textAuthResponsive pl-1"
          onClick={onLogin}
        >
          Log in
        </Button>
      </div>
    </div>
  );
}
