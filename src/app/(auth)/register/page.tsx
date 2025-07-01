"use client";
import AuthRegCard from "@/app/components/ui/auth-page-ui/auth-registration-card";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const universityOptions = [
  { value: "u1", label: "Cebu Institute of Technology University" },
  { value: "u2", label: "Cebu Technological University" },
];
const courseOptions = [
  { value: "bscpe", label: "Bachelors of Science in Computer Engineering" },
  { value: "bsce", label: "Bachelors of Science in Civil Engineering" },
  { value: "bscs", label: "Bachelors of Science in Computer Science" },
];
const yearOptions = [
  { value: "year_1", label: "1" },
  { value: "year_2", label: "2" },
  { value: "year_3", label: "3" },
  { value: "year_4", label: "4" },
  { value: "year_5", label: "5" },
];

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [university, setUniversity] = useState("");
  const [course, setCourse] = useState("");
  const [year, setYear] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (!university || !course || !year) {
      setError("Please select university, course, and year");
      return;
    }
    setLoading(true);
    // 1. Create the user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });
    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }
    // 2. Create their profile in the public.student table
    const { error: profileError } = await supabase
      .from("student")
      .insert({
        user_id: authData.user?.id,
        fname: firstName,
        lname: lastName,
        mname: middleName,
        email,
        universityid: university,
        course,
        year,
      });
    setLoading(false);
    if (profileError) {
      setError(profileError.message);
      return;
    }
    // 3. Redirect or show success message
    router.push("/forgot-send-email"); // Or wherever you want to send them
  };

  return (
    <div className="flex items-center justify-center">
      <AuthRegCard
        firstName={firstName}
        lastName={lastName}
        middleName={middleName}
        email={email}
        password={password}
        confirmPassword={confirmPassword}
        university={university}
        course={course}
        year={year}
        loading={loading}
        error={error}
        universityOptions={universityOptions}
        courseOptions={courseOptions}
        yearOptions={yearOptions}
        onFirstNameChange={e => setFirstName(e.target.value)}
        onLastNameChange={e => setLastName(e.target.value)}
        onMiddleNameChange={e => setMiddleName(e.target.value)}
        onEmailChange={e => setEmail(e.target.value)}
        onPasswordChange={e => setPassword(e.target.value)}
        onConfirmPasswordChange={e => setConfirmPassword(e.target.value)}
        onUniversityChange={setUniversity}
        onCourseChange={setCourse}
        onYearChange={setYear}
        onSubmit={handleRegister}
        onLogin={() => router.push("/login")}
      />
    </div>
  );
}
