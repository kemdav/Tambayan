"use client";

import { useEffect, useState } from "react";
import { AvatarIcon } from "../avatar-icon-component";
import { createClient } from "@/lib/supabase/client";

export default function FirstHeader() {
  const [univName, setUnivName] = useState("Admin User");

  useEffect(() => {
    async function fetchUniversityName() {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user?.email) return;

      const { data, error } = await supabase
        .from("university")
        .select("uname")
        .eq("universityemail", user.email)
        .maybeSingle();

      if (error) {
        console.error("❌ Error fetching university name:", error.message);
        return;
      }

      if (data?.uname) {
        setUnivName(data.uname);
      }
    }

    fetchUniversityName();
  }, []);

  return (
    <div className="w-full max-w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border rounded-[10px] p-4 bg-white shadow-md">
      <h1 className="text-xl sm:text-2xl font-medium">Campus Analytics</h1>

      <div className="flex items-center gap-2 text-sm">
        <AvatarIcon className="w-8 h-8 sm:w-10 sm:h-10" />
        <span className="text-sm">{univName}</span>
      </div>
    </div>
  );
}
