"use client";
import { Button } from "@/app/components/ui/general/button";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const code = searchParams.get("code");
    if (code) {
      router.replace(`/reset-password?code=${encodeURIComponent(code)}`);
    }
  }, [searchParams, router]);

  return (
    <main>
      <h1 className="text-5xl">Quick Links</h1>
      <ul>
        <Button
          variant="link"
          className="text-action-light-blue text-3xl"
          onClick={() => router.push("/login")}
        >
          Authentication Page
        </Button>
        <Button
          variant="link"
          className="text-action-light-blue text-3xl"
          onClick={() => router.push("/admin/dashboard")}
        >
          Admin Dashboard
        </Button>
      </ul>
    </main>
  );
}
