import { TambayanIcon } from "../../icons";
import { Button } from "@/app/components/ui/button";
import { PasswordInput } from "../password-input";
import { Input } from "../input";
import { SearchIcon } from "lucide-react";
import { UserPofileLoginIcon } from "../../icons";

export default function AuthRegCard() {
  return (
    <div className="bg-neutral-linen-white ring-1 select-none ring-action-forest-green w-130 h-140 p-10 rounded-4xl">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-action-forest-green text text-2xl font-bold">
          Student Registration
        </h1>
        <p className="text-action-forest-green text-xs">
          Enter your information to get started.
        </p>
      </div>

      <div className="grid grid-cols-4 gap-3">
        <div>
          <p className="text-action-forest-green">Last Name</p>
          <Input className="bg-neutral-ivory-white"></Input>
        </div>

        <div className="col-span-2">
          <p className="text-action-forest-green">First Name</p>
          <Input className="bg-neutral-ivory-white"></Input>
        </div>

        <div>
          <p className="text-action-forest-green">Middle Name</p>
          <Input className="bg-neutral-ivory-white"></Input>
        </div>
      </div>

      <div className="flex flex-col gap-5 mt-3">
        <div>
          <p className="text-action-forest-green">Email</p>
          <Input
            rightIcon={<UserPofileLoginIcon />}
            className="bg-neutral-ivory-white"
          ></Input>
        </div>

        <div>
          <p className="text-action-forest-green">University (Temp)</p>
          <Input
            rightIcon={<UserPofileLoginIcon />}
            className="bg-neutral-ivory-white"
          ></Input>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3">
        <div>
          <p className="text-action-forest-green">Year Level</p>
          <Input className="bg-neutral-ivory-white"></Input>
        </div>

        <div className="col-span-3">
          <p className="text-action-forest-green">Course</p>
          <Input className="bg-neutral-ivory-white"></Input>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3">
        <div className="col-span-2">
          <p className="text-action-forest-green">Password</p>
          <Input className="bg-neutral-ivory-white"></Input>
        </div>

        <div className="col-span-2">
          <p className="text-action-forest-green">Confirm Password</p>
          <PasswordInput className="bg-neutral-ivory-white"></PasswordInput>
        </div>
      </div>

      <Button
        className="text-neutral-linen-white 
        bg-linear-to-r from-action-seafoam-green to-action-forest-green
         hover:from-action-seafoam-green/90 hover:to-action-forest-green/90 
         font-bold text-xl w-full mt-3"
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
