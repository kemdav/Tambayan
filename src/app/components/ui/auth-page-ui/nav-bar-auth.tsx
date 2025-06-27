"use client";
import { TambayanIcon, TambayanTextIcon } from "../../icons";
import { Button } from "@/app/components/ui/general/button";
import { useRouter } from "next/navigation";

export default function AuthNavBar() {
  const router = useRouter();
  return (
    <div className="bg-secondary-muted-sage grid grid-cols-2">
      <div className="flex mx-3 my-3">
        <TambayanIcon size={40} />
        <TambayanTextIcon className="w-44"/>
      </div>
      <div className="flex flex-row-reverse">
        <Button
          variant="navigation"
          className="bg-secondary-muted-sage text-neutral-ivory-white lg:w-40 h-16"
          onClick={() => router.push("/register")}
        >
          Register
        </Button>
        <Button
          variant="navigation"
          className="bg-secondary-muted-sage text-neutral-ivory-white lg:w-40 h-16"
          onClick={() => router.push("/login")}
        >
          Login
        </Button>
      </div>
    </div>
  );
}
