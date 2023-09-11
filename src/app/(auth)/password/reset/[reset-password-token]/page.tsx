import { AuthHeader } from '@/app/(auth)/components/auth-header';
import { ResetPassword } from '@/app/(auth)/password/components/reset-password';

interface PageLayoutProps {}

export default function ResetPasswordPage({}: PageLayoutProps) {
  return (
    <>
      <AuthHeader title="Reset Password" subtitle="Set a new password for your account below" />
      <ResetPassword />
    </>
  );
}
