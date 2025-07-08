//register page.tsx
"use client";
import AuthRegCard from "@/app/components/ui/auth-page-ui/auth-registration-card";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
// We only need the `signup` action here
import { signup } from '../action'

// const universityOptions = [
//   { value: "u1", label: "Cebu Institute of Technology University" },
//   { value: "u2", label: "Cebu Technological University" },
// ];
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
  const [universityOptions, setUniversityOptions] = useState<{ value: string; label: string }[]>([]);
  const router = useRouter();
  
  useEffect(() => {
    const fetchUniversities = async () => {
      const supabase = createClient();
      const { data, error } = await supabase.from("university").select("universityid, uname");
      if (!error && data) {
        setUniversityOptions(
          data.map((u: any) => ({ value: u.universityid, label: u.uname }))
        );
      }
    };
    fetchUniversities();
  }, []);
  
  // --- MODIFICATION START ---
  // Create a handler to bridge the client state and the server action
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    setError(null);
    setLoading(true);

    // Perform client-side validation first
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
    if (!university || !course || !year) {
      setError("Please select university, course, and year");
      setLoading(false);
      return;
    }
    
    // Create a FormData object and populate it with state
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('fname', firstName);
    formData.append('lname', lastName);
    formData.append('mname', middleName);
    formData.append('universityid', university);
    formData.append('course', course);
    formData.append('yearlevel', year);

    // Call the server action with the complete FormData
    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          fname: firstName,
          lname: lastName,
          mname: middleName,
          universityid: university,
          course,
          yearlevel: year,
          role: 'student',
        },
      },
    });

    if (error) {
      setError(error.message);
    } else {
      setLoading(false);
      router.push("/login");
    }
  }
  // --- MODIFICATION END ---


  return (
    <div className="flex items-center justify-center">
      <AuthRegCard
        firstName={firstName}
        lastName={lastName}
        middleName={middleName}
        email={email}
        password={password}
        confirmPassword={confirmPassword}
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
        // Pass the new handler to the onSubmit prop
        onSubmit={handleRegister}
        onLogin={() => router.push("/login")}
      />
    </div>
  );
}