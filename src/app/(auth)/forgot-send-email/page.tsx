// page.tsx
import { Suspense } from 'react';
import ForgotSendEmailForm from './forgot-send-email.client';

// A simple loading fallback component
const Loading = () => {
    return <div>Loading...</div>;
}

export default function ForgotSendEmailPage() {
  return (
    // Wrap the client component in a Suspense boundary.
    // Next.js will render the `fallback` on the server first.
    <Suspense fallback={<Loading />}>
      <ForgotSendEmailForm />
    </Suspense>
  );
}