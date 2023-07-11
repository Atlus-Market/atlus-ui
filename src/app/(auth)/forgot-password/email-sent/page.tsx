import { AuthHeader } from '@/app/(auth)/components/auth-header';
import { AtlusButton } from '@/components/ui/button/atlus-button';
import Link from 'next/link';
import { LoginRoute } from '@/constants/routes';

export default function EmailSentPage() {
  return (
    <>
      <AuthHeader
        title='Check your email'
        subtitle='If your email is associated with an account, a reset password link has been sent.'
      />
      <div className='text-center w-full mt-12'>
        <Link href={LoginRoute}>
          <AtlusButton>Back to Login</AtlusButton>
        </Link>
      </div>
    </>
  );
};
