// page.tsx
import { Suspense } from 'react';
import ResetPasswordForm from './reset-password-client';

// You can create a more visually appealing loading skeleton if you wish
const Loading = () => {
    return (
        <div className="flex items-center justify-center">
            <div>Verifying reset link...</div>
        </div>
    );
}

export default function ResetPasswordPage() {
  return (
    // Wrap the component that uses the client-side hook in a Suspense boundary.
    <Suspense fallback={<Loading />}>
      <ResetPasswordForm />
    </Suspense>
  );
}