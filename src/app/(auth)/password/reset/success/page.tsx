import { AuthHeader } from '@/app/(auth)/components/auth-header';
import Link from 'next/link';
import { AtlusButton } from '@/components/ui/button/atlus-button';
import { LoginRoute } from '@/constants/routes';

interface PageLayoutProps {
}

export default function PasswordResetSuccessPage({}: PageLayoutProps) {
  return (
    <>
      <AuthHeader
        title='Your password has been reset!'
        subtitle='You can now log into your account.'
      />
      <div className='text-center w-full mt-12'>
        <Link href={LoginRoute}>
          <AtlusButton>Go to log in</AtlusButton>
        </Link>
      </div>
    </>
  );
};
