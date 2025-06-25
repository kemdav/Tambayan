"use client";
import { TambayanIcon, TambayanTextIcon } from "../../icons";
import { Button } from "@/app/components/ui/button";
import { useRouter } from "next/navigation";

export default function AuthNavBar() {
  const router = useRouter();
  return (
    <div className="bg-secondary-muted-sage grid grid-cols-2 p-3">
      <div className="flex">
        <TambayanIcon size={40} />
        <TambayanTextIcon className="w-44"/>
      </div>
      <div className="flex flex-row-reverse lg:gap-10 lg:mr-20">
        <Button
          variant="navigation"
          className="text-neutral-ivory-white bg-secondary-muted-sage rounded-4xl"
          onClick={() => router.push("/register")}
        >
          Register
        </Button>
        <Button
          variant="navigation"
          className="bg-primary-moss-green text-neutral-ivory-white rounded-4xl"
          onClick={() => router.push("/login")}
        >
          Login
        </Button>
      </div>
    </div>
  );
}
