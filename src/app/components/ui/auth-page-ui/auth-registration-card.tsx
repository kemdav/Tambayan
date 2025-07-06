//auth-registration-card.tsx
"use client";

import { Button } from "@/app/components/ui/general/button";
import { PasswordInput } from "@/app/components/ui/general/input/password-input";
import { Input } from "@/app/components/ui/general/input/input";
import { EmailIcon } from "../../icons";
import DropdownRole from "@/app/components/ui/general/dropdown/dropdown-role";
import React from "react";

interface Option {
  value: string;
  label: string;
}

interface AuthRegCardProps {
  firstName: string;
  lastName: string;
  middleName: string;
  email: string;
  password: string;
  confirmPassword: string;
  loading: boolean;
  error: string | null;
  universityOptions: Option[];
  courseOptions: Option[];
  yearOptions: Option[];
  onFirstNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onLastNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onMiddleNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onConfirmPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onUniversityChange: (value: string) => void;
  onCourseChange: (value: string) => void;
  onYearChange: (value: string) => void;
  // --- MODIFICATION: Changed prop to a standard event handler ---
  onSubmit: (e: React.FormEvent) => void;
  onLogin: () => void;
}

export default function AuthRegCard({
  firstName,
  lastName,
  middleName,
  email,
  password,
  confirmPassword,
  loading,
  error,
  universityOptions,
  courseOptions,
  yearOptions,
  onFirstNameChange,
  onLastNameChange,
  onMiddleNameChange,
  onEmailChange,
  onPasswordChange,
  onConfirmPasswordChange,
  onUniversityChange,
  onCourseChange,
  onYearChange,
  onSubmit,
  onLogin,
}: AuthRegCardProps) {
  return (
    <div className="card w-100 lg:w-130 h-150 p-5 lg:p-10 overflow-auto">
      <div className="flex flex-col justify-center items-center mb-5">
        <h1 className="responsiveCardHeading mb-2">Student Registration</h1>
        <p className="textAuthResponsive text-sm">
          Enter your information to get started.
        </p>
      </div>

      {/* --- MODIFICATION: Added onSubmit to the form tag --- */}
      <form onSubmit={onSubmit}>
        <div className="grid grid-cols-3 grid-row-1 gap-2 lg:grid-cols-4">
          <div className="col-span-2 lg:col-span-1 lg:order-1">
            <p className="textAuthResponsive">Last Name</p>

            <Input
              className="inputAuthResponsive"
              value={lastName}
              onChange={onLastNameChange}
              required
            />
          </div>

          <div className="lg:order-3">
            <p className="textAuthResponsive">Middle Name</p>
            <Input
              className="inputAuthResponsive"
              value={middleName}
              onChange={onMiddleNameChange}
            />
          </div>

          <div className="col-span-3 lg:col-span-2 lg:order-2">
            <p className="textAuthResponsive">First Name</p>
            <Input
              className="inputAuthResponsive"
              value={firstName}
              onChange={onFirstNameChange}
              required
            />
          </div>
        </div>

        <div className="flex flex-col lg:mt-3">
          <div>
            <p className="textAuthResponsive">Email</p>
            <Input
              rightIcon={<EmailIcon className="size-6" />}
              className="inputAuthResponsive"
              value={email}
              onChange={onEmailChange}
              type="email"
              required
            />
          </div>

          <div>
            <p className="textAuthResponsive lg:mt-3">University</p>
            <DropdownRole
              options={universityOptions}
              width="w-full"
              onSelect={onUniversityChange}
              placeholder="Choose University"
            />
          </div>
        </div>

        <div className="flex lg:mt-3 gap-3">
          <div className="">
            <p className="textAuthResponsive">Year Level</p>
            <DropdownRole
              options={yearOptions}
              onSelect={onYearChange}
              placeholder="Choose Year"
            />
          </div>

          <div className="grow">
            <p className="textAuthResponsive">Course</p>
            <DropdownRole
              options={courseOptions}
              width="w-full lg:max-w-[280px]"
              onSelect={onCourseChange}
              placeholder="Choose Course"
            />
          </div>
        </div>

        <div className="grid grid-row-2 lg:gap-3 lg:mt-3 lg:flex">
          <div>
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

        {/* --- MODIFICATION: Removed formAction, it's now a standard submit button --- */}
        <Button
          className="text-neutral-linen-white bg-linear-to-r from-action-seafoam-green to-action-forest-green hover:from-action-seafoam-green/90 hover:to-action-forest-green/90 font-bold text-xl w-full mt-5 lg:mt-6"
          type="submit"
          disabled={loading}
        >
          {loading ? "Signing up..." : "Sign Up"}
        </Button>
      </form>

      <div className="flex items-center justify-center">
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
