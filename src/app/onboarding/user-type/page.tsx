import BuyerSvg from '@/public/assets/images/onboarding/buyer.svg';
import BrokerSvg from '@/public/assets/images/onboarding/broker.svg';
import { AtlusTitle } from '@/components/ui/typography/atlus-title';
import { AtlusImageCard } from '@/components/ui/atlus-image-card';
import { SelectedCardHandler } from '@/app/onboarding/user-type/components/selected-card-handler';
import { AtlusLink } from '@/components/ui/link/atlus-link';

export default function UserTypePage() {
  return (
    <>
      <AtlusTitle
        text='Which best describes you?'
        className='mb-12 text-center'
      />
      <div className='flex justify-center gap-6 flex-wrap mb-12'>
        <SelectedCardHandler userType='buyer'>
          <AtlusImageCard
            image={BuyerSvg}
            title="I'm a buyer"
            description='I want to find and buy patents'
          />
        </SelectedCardHandler>
        <SelectedCardHandler userType='broker'>
          <AtlusImageCard
            image={BrokerSvg}
            title="I'm a broker"
            description='I make deals happen'
          />
        </SelectedCardHandler>
      </div>
      <div className='flex justify-center'>
        <span className='text-dark-grey text-[11px] font-medium leading-normal'>
          By continuing, you agree to our{' '}
          <AtlusLink href='https://ofinno.com' target='_blank'>Terms of Service</AtlusLink>,{' '}
          <AtlusLink href='https://ofinno.com' target='_blank'>Privacy Policy</AtlusLink>
          {' '}and{' '}
          <AtlusLink href='https://ofinno.com' target='_blank'>Cookies Policy</AtlusLink>.
        </span>
      </div>
    </>
  );
}
