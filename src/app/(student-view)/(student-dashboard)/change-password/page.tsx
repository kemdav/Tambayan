"use client";
import { useState } from "react";
import { Button } from "@/app/components/ui/general/button";
import { PasswordInput } from "@/app/components/ui/general/input/password-input";
import { createClient } from "@/lib/supabase/client";

export default function ChangePasswordPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("All fields are required.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }
    if (newPassword.length < 8) {
      setError("New password must be at least 8 characters.");
      return;
    }
    setIsSubmitting(true);
    try {
      const supabase = createClient();
      // Fetch the logged-in user
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (!user || userError) {
        setError("You must be logged in to change your password.");
        setIsSubmitting(false);
        return;
      }
      if (!user.email) {
        setError("Your account does not have an email address. Cannot change password.");
        setIsSubmitting(false);
        return;
      }
      // 1. Re-authenticate with current password
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: currentPassword,
      });
      if (signInError) {
        setError("Current password is incorrect.");
        setIsSubmitting(false);
        return;
      }
      // 2. Update password
      const { error: updateError } = await supabase.auth.updateUser({ password: newPassword });
      if (updateError) {
        setError(updateError.message || "Failed to update password. Please try again.");
      } else {
        setSuccess("Password changed successfully!");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="w-full min-h-dvh flex items-center justify-center bg-neutral-linen-white">
      <div className="card flex flex-col justify-center items-center p-14 max-w-2xl w-full">
        <h1 className="responsiveCardHeading text-center mb-8 text-4xl lg:text-5xl">Change Password</h1>
        <form className="flex flex-col w-full gap-8" onSubmit={handleSubmit}>
          <div>
            <p className="textAuthResponsive mb-2 text-lg lg:text-xl">Current Password</p>
            <PasswordInput
              className="bg-secondary-light-moss/20 h-14 text-lg lg:text-xl"
              name="current-password"
              value={currentPassword}
              onChange={e => setCurrentPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>
          <div>
            <p className="textAuthResponsive mb-2 text-lg lg:text-xl">New Password</p>
            <PasswordInput
              className="bg-secondary-light-moss/20 h-14 text-lg lg:text-xl"
              name="new-password"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              required
              autoComplete="new-password"
            />
          </div>
          <div>
            <p className="textAuthResponsive mb-2 text-lg lg:text-xl">Confirm New Password</p>
            <PasswordInput
              className="bg-secondary-light-moss/20 h-14 text-lg lg:text-xl"
              name="confirm-password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              required
              autoComplete="new-password"
            />
          </div>
          {error && <div className="text-red-500 text-base text-center mt-2">{error}</div>}
          {success && <div className="text-green-600 text-base text-center mt-2">{success}</div>}
          <Button
            className="text-neutral-linen-white bg-linear-to-r from-action-seafoam-green to-action-forest-green hover:from-action-seafoam-green/90 hover:to-action-forest-green/90 font-bold text-2xl w-full mt-4 h-16 transition-colors duration-300"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Changing..." : "Change Password"}
          </Button>
        </form>
      </div>
    </main>
  );
} 