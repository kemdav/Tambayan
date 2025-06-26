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
import { useRouter } from "next/navigation";

export default function AuthRegCard() {
  const router = useRouter();

  return (
    <div className="card w-100 lg:w-130 h-160 p-10">
      <div className="flex flex-col justify-center items-center">
        <h1 className="responsiveCardHeading">
          Student Registration
        </h1>
        <p className="text-action-forest-green text-xs">
          Enter your information to get started.
        </p>
      </div>

      <div className="grid grid-cols-3 grid-row-1 gap-2 lg:grid-cols-4">
        <div className="col-span-2 lg:col-span-1 lg:order-1">
          <p className="text-action-forest-green">Last Name</p>
          <Input className="bg-secondary-light-moss/20"></Input>
        </div>

        <div className="lg:order-3">
        <p className="text-action-forest-green">Middle Name</p>
        <Input className="bg-secondary-light-moss/20"></Input>
        </div>   
        
        <div className="col-span-3 lg:col-span-2 lg:order-2">
          <p className="text-action-forest-green">First Name</p>
          <Input className="bg-secondary-light-moss/20"></Input>
        </div>  
      </div>

      <div className="flex flex-col lg:mt-3">
        <div>
          <p className="text-action-forest-green">Email</p>
          <Input
            rightIcon={<EmailIcon className="size-6" />}
            className="bg-secondary-light-moss/20"
          ></Input>
        </div>

        <div>
          <p className="text-action-forest-green lg:mt-3">University (Temp)</p>
          <Input
            rightIcon={<UniversityIcon className="size-6" />}
            className="bg-secondary-light-moss/20"
          ></Input>
        </div>
      </div>

      <div className="flex lg:mt-3 gap-3">
        <div className="w-20">
          <p className="text-action-forest-green">Year Level</p>
          <Input className="bg-secondary-light-moss/20"></Input>
        </div>

        <div className="col-span-3 grow">
          <p className="text-action-forest-green">Course</p>
          <Input
            className="bg-secondary-light-moss/20"
            rightIcon={<CourseIcon className="size-6" />}
          ></Input>
        </div>
      </div>

      <div className="grid grid-row-2 lg:gap-3 lg:mt-3 lg:flex">
        <div>
          <p className="text-action-forest-green">Password</p>
          <PasswordInput className="bg-secondary-light-moss/20"></PasswordInput>
        </div>

        <div>
          <p className="text-action-forest-green">Confirm Password</p>
          <PasswordInput className="bg-secondary-light-moss/20"></PasswordInput>
        </div>
      </div>

      <Button
        className="text-neutral-linen-white 
        bg-linear-to-r from-action-seafoam-green to-action-forest-green
         hover:from-action-seafoam-green/90 hover:to-action-forest-green/90 
         font-bold text-xl w-full mt-5 lg:mt-10"
      >
        Sign Up
      </Button>

      <div className="flex items-center justify-center">
        <p className="text-action-forest-green">Already have an account?</p>
        <Button
          variant="link"
          className="text-action-forest-green"
          onClick={() => router.push("/login")}
        >
          Log in
        </Button>
      </div>
    </div>
  );
}
