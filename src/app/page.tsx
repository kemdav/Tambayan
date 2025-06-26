"use client"
import { Button } from "@/app/components/ui/general/button";
import {useRouter} from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <main>
        <h1 className="text-5xl">Quick Links</h1>
        <ul>
          <Button variant="link" className="text-action-light-blue text-3xl" onClick={()=>router.push("\login")}>Authentication Page</Button>
        </ul>
    </main>
  )
}
