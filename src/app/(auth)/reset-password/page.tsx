'use client';
import AuthResetPasswordCard from "@/app/components/ui/auth-page-ui/auth-reset-password-card";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  return (
    <div className="flex items-center justify-center">
      <AuthResetPasswordCard code={code} />
    </div>
  );
}
