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

export default function AuthRegCard() {
  const router = useRouter();

  // Might consider moving this to another file later on
  const YrOptions = [
    { value: "year_1", label: "1" },
    { value: "year_2", label: "2" },
    { value: "year_3", label: "3" },
    { value: "year_4", label: "3" },
    { value: "year_5", label: "4" }
  ];

  // Ideally, the value would be u[University ID]
   const UniversityOptions = [
    { value: "u1", label: "Cebu Institue of Technology University" },
    { value: "u2", label: "Cebu Technological University" },
  ];

   const CourseOptions = [
    { value: "bscpe", label: "Bachelors of Science in Computer Engineering" },
    { value: "bsce", label: "Bachelors of Science in Civil Engineering" },
    { value: "bscs", label: "Bachelors of Science in Computer Science" }
  ];

  return (
    <div className="card w-100 lg:w-130 h-160 p-5 lg:p-10">
      <div className="flex flex-col justify-center items-center">
        <h1 className="responsiveCardHeading">Student Registration</h1>
        <p className="textAuthResponsive text-xs">
          Enter your information to get started.
        </p>
      </div>

      <div className="grid grid-cols-3 grid-row-1 gap-2 lg:grid-cols-4">
        <div className="col-span-2 lg:col-span-1 lg:order-1">
          <p className="textAuthResponsive">Last Name</p>
          <Input className="inputAuthResponsive"></Input>
        </div>

        <div className="lg:order-3">
          <p className="textAuthResponsive">Middle Name</p>
          <Input className="inputAuthResponsive"></Input>
        </div>

        <div className="col-span-3 lg:col-span-2 lg:order-2">
          <p className="textAuthResponsive">First Name</p>
          <Input className="inputAuthResponsive"></Input>
        </div>
      </div>

      <div className="flex flex-col lg:mt-3">
        <div>
          <p className="textAuthResponsive">Email</p>
          <Input
            rightIcon={<EmailIcon className="size-6" />}
            className="inputAuthResponsive"
          ></Input>
        </div>

        <div>
          <p className="textAuthResponsive lg:mt-3">University</p>
          <DropdownRole options={UniversityOptions} width="w-full"></DropdownRole>
        </div>
      </div>

      <div className="flex lg:mt-3 gap-3">
        <div className="">
          <p className="textAuthResponsive">Year Level</p>
          <DropdownRole options={YrOptions}></DropdownRole>
        </div>

        <div className="grow">
          <p className="textAuthResponsive">Course</p>
          <DropdownRole options={CourseOptions} width="w-full"></DropdownRole>
        </div>
      </div>

      <div className="grid grid-row-2 lg:gap-3 lg:mt-3 lg:flex">
        <div>
          <p className="textAuthResponsive">Password</p>
          <PasswordInput className="inputAuthResponsive"></PasswordInput>
        </div>

        <div>
          <p className="textAuthResponsive">Confirm Password</p>
          <PasswordInput className="inputAuthResponsive"></PasswordInput>
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
        <p className="textAuthResponsive">Already have an account?</p>
        <Button
          variant="link"
          className="textAuthResponsive"
          onClick={() => router.push("/login")}
        >
          Log in
        </Button>
      </div>
    </div>
  );
}
