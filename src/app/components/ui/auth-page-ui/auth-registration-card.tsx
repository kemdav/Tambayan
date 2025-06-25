import { Button } from "@/app/components/ui/button";
import { PasswordInput } from "../password-input";
import { Input } from "../input";
import {
  UserPofileLoginIcon,
  EmailIcon,
  CourseIcon,
  UniversityIcon,
} from "../../icons";

export default function AuthRegCard() {
  return (
    <div className="bg-neutral-pure-white ring-1 select-none w-130 h-160 p-10 rounded-4xl">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-action-forest-green text text-4xl font-bold">
          Student Registration
        </h1>
        <p className="text-action-forest-green text-xs">
          Enter your information to get started.
        </p>
      </div>

      <div className="grid grid-cols-4 gap-3 mt-5">
        <div>
          <p className="text-action-forest-green">Last Name</p>
          <Input className="bg-secondary-light-moss/20"></Input>
        </div>

        <div className="col-span-2">
          <p className="text-action-forest-green">First Name</p>
          <Input className="bg-secondary-light-moss/20"></Input>
        </div>

        <div>
          <p className="text-action-forest-green">Middle Name</p>
          <Input className="bg-secondary-light-moss/20"></Input>
        </div>
      </div>

      <div className="flex flex-col mt-3">
        <div>
          <p className="text-action-forest-green">Email</p>
          <Input
            rightIcon={<EmailIcon className="size-6" />}
            className="bg-secondary-light-moss/20"
          ></Input>
        </div>

        <div>
          <p className="text-action-forest-green mt-3">University (Temp)</p>
          <Input
            rightIcon={<UniversityIcon className="size-6" />}
            className="bg-secondary-light-moss/20"
          ></Input>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3 mt-3">
        <div>
          <p className="text-action-forest-green">Year Level</p>
          <Input className="bg-secondary-light-moss/20"></Input>
        </div>

        <div className="col-span-3">
          <p className="text-action-forest-green">Course</p>
          <Input
            className="bg-secondary-light-moss/20"
            rightIcon={<CourseIcon className="size-6" />}
          ></Input>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3 mt-3">
        <div className="col-span-2">
          <p className="text-action-forest-green">Password</p>
          <Input className="bg-secondary-light-moss/20"></Input>
        </div>

        <div className="col-span-2">
          <p className="text-action-forest-green">Confirm Password</p>
          <PasswordInput className="bg-secondary-light-moss/20"></PasswordInput>
        </div>
      </div>

      <Button
        className="text-neutral-linen-white 
        bg-linear-to-r from-action-seafoam-green to-action-forest-green
         hover:from-action-seafoam-green/90 hover:to-action-forest-green/90 
         font-bold text-xl w-full mt-10"
      >
        Sign Up
      </Button>

      <div className="flex items-center justify-center">
        <p className="text-action-forest-green">Already have an account?</p>
        <Button variant="link" className="text-action-forest-green">
          Log in
        </Button>
      </div>
    </div>
  );
}
