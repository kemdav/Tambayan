"use client";

import { Button } from "@/app/components/ui/general/button";
import { PasswordInput } from "@/app/components/ui/general/input/password-input";
import { Input } from "@/app/components/ui/general/input/input";
import {
  UserPofileLoginIcon,
  EmailIcon,
  CourseIcon,
  UniversityIcon,
} from "../../icons";
import DropdownRole from "@/app/components/ui/general/dropdown/dropdown-role";
import { useRouter } from "next/navigation";
import React from "react";
import { supabase } from "@/lib/supabase/client";

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
  university: string;
  course: string;
  year: string;
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
  university,
  course,
  year,
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
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({ email, password });
      if (authError) {
        console.error("Supabase Auth Error:", authError.message);
        return;
      }

      await supabase.from('student').insert({
        user_id: authData.user.id,
        fname: firstName,
        lname: lastName,
        mname: middleName,
        university: university,
        course: course,
        year: year,
      });

      onSubmit(e);
    } catch (error) {
      console.error("Registration Error:", error);
    }
  };

  return (
    <div className="card w-100 lg:w-130 h-160 p-5 lg:p-10">
      <div className="flex flex-col justify-center items-center">
        <h1 className="responsiveCardHeading">Student Registration</h1>
        <p className="textAuthResponsive text-xs">
          Enter your information to get started.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-3 grid-row-1 gap-2 lg:grid-cols-4">
          <div className="col-span-2 lg:col-span-1 lg:order-1">
            <p className="textAuthResponsive">Last Name</p>
            <Input className="inputAuthResponsive" value={lastName} onChange={onLastNameChange} required />
          </div>

          <div className="lg:order-3">
            <p className="textAuthResponsive">Middle Name</p>
            <Input className="inputAuthResponsive" value={middleName} onChange={onMiddleNameChange} />
          </div>

          <div className="col-span-3 lg:col-span-2 lg:order-2">
            <p className="textAuthResponsive">First Name</p>
            <Input className="inputAuthResponsive" value={firstName} onChange={onFirstNameChange} required />
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
            />
          </div>
        </div>

        <div className="flex lg:mt-3 gap-3">
          <div className="">
            <p className="textAuthResponsive">Year Level</p>
            <DropdownRole options={yearOptions} onSelect={onYearChange} />
          </div>

          <div className="grow">
            <p className="textAuthResponsive">Course</p>
            <DropdownRole options={courseOptions} width="w-full" onSelect={onCourseChange} />
          </div>
        </div>

        <div className="grid grid-row-2 lg:gap-3 lg:mt-3 lg:flex">
          <div>
            <p className="textAuthResponsive">Password</p>
            <PasswordInput className="inputAuthResponsive" value={password} onChange={onPasswordChange} required />
          </div>

          <div>
            <p className="textAuthResponsive">Confirm Password</p>
            <PasswordInput className="inputAuthResponsive" value={confirmPassword} onChange={onConfirmPasswordChange} required />
          </div>
        </div>

        {error && (
          <div className="text-red-500 text-sm text-center mt-2">{error}</div>
        )}

        <Button
          className="text-neutral-linen-white \
        bg-linear-to-r from-action-seafoam-green to-action-forest-green\n         hover:from-action-seafoam-green/90 hover:to-action-forest-green/90 \
         font-bold text-xl w-full mt-5 lg:mt-10"
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
          className="textAuthResponsive"
          onClick={onLogin}
        >
          Log in
        </Button>
      </div>
    </div>
  );
}
