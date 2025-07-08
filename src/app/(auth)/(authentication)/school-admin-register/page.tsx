"use client";
import AuthRegistrationAdminCard from "@/app/components/ui/auth-page-ui/auth-registration-admin-card";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const departmentOptions = [
  { value: "student-affairs", label: "Student Affairs" },
  { value: "academic-affairs", label: "Academic Affairs" },
  { value: "finance", label: "Finance" },
  { value: "it", label: "IT" },
  { value: "hr", label: "Human Resources" },
];

export default function SchoolAdminRegisterPage() {
  const [universityName, setUniversityName] = useState("");
  const [universityEmail, setUniversityEmail] = useState("");
  const [universityContact, setUniversityContact] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent<Element>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }
    if (!universityName || !universityEmail || !universityContact) {
      setError("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    // TODO: Implement actual admin registration logic here (e.g., call a server action)
    // For now, just simulate success and redirect
    setTimeout(() => {
      setLoading(false);
      router.push("/login?message=Admin registration successful. Please log in.");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent">
      <AuthRegistrationAdminCard
        universityName={universityName}
        universityEmail={universityEmail}
        universityContact={universityContact}
        password={password}
        confirmPassword={confirmPassword}
        loading={loading}
        error={error}
        onUniversityNameChange={(e: React.ChangeEvent<HTMLInputElement>) => setUniversityName(e.target.value)}
        onUniversityEmailChange={(e: React.ChangeEvent<HTMLInputElement>) => setUniversityEmail(e.target.value)}
        onUniversityContactChange={(e: React.ChangeEvent<HTMLInputElement>) => setUniversityContact(e.target.value)}
        onPasswordChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
        onConfirmPasswordChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
        onSubmit={handleRegister}
        onLogin={() => router.push("/login")}
      />
    </div>
  );
}
