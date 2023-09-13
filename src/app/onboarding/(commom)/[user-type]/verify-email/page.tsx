import { AtlusTitle } from '@/components/ui/typography/atlus-title';
import VerifyEmailSvg from '@/public/assets/images/onboarding/verify-email.svg';
import Image from 'next/image';
import { SendVerificationEmail } from '@/app/onboarding/(commom)/[user-type]/verify-email/components/send-verification-email';

export default function VerifyEmailPage() {
  return (
    <div className="flex flex-col justify-center items-center max-w-[600px] mx-auto">
      <Image
        src={VerifyEmailSvg}
        alt="Verify email"
        priority
        className="max-w-[230px] md:max-w-[300px]"
      />
      <AtlusTitle text="Verify your email" className="mb-4 text-center" />
      <SendVerificationEmail />
    </div>
  );
}
