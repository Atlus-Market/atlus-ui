import { Login } from '@/app/(auth)/login/components/Login';
import { AuthHeader } from '@/app/(auth)/components/auth-header';

interface PageLayoutProps {}

export default function LoginPage({}: PageLayoutProps) {
  return (
    <>
      <AuthHeader title="Log in to Atlus" />
      <Login />
    </>
  );
}
