import AuthLoginCard from "@/app/components/ui/auth-page-ui/auth-login-card";
import AuthRegCard from "@/app/components/ui/auth-page-ui/auth-registration-card";

export default function Home() {
  return (
    <div className="flex items-center justify-center">
      <AuthRegCard></AuthRegCard>
    </div>
  );
}
