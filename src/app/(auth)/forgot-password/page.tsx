import { ForgotPassword } from '@/app/(auth)/forgot-password/components/forgot-password';
import { AuthHeader } from '@/app/(auth)/components/auth-header';

interface PageLayoutProps {}

export default function ForgotPasswordPage({}: PageLayoutProps) {
  return (
    <>
      <AuthHeader
        title="Forgot Password?"
        subtitle="No worries, we’ll email you a link to reset your password."
      />
      <ForgotPassword />
    </>
  );
}
