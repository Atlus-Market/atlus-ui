import BuyerSvg from '@/public/assets/images/onboarding/buyer.svg'
import BrokerSvg from '@/public/assets/images/onboarding/broker.svg'
import Image from 'next/image';
import { StaticImageData } from 'next/dist/client/image';
import { Title } from '@/components/ui/typography/title';
import Link from 'next/link';

interface UserTypeInfo {
  key: string;
  image: StaticImageData;
  title: string;
  description: string;
}

const userTypes: UserTypeInfo[] = [
  {
    key: 'buyer',
    image: BuyerSvg,
    title: 'I\'m a buyer',
    description: 'I want to find and buy patents'
  },
  {
    key: 'broker',
    image: BrokerSvg,
    title: 'I\'m a broker',
    description: 'I make deals happen'
  }
]

export default function UserTypePage() {
  return (
    <>
      <Title text="Which best describes you?" className="mb-12 text-center" />
      <div className="flex justify-center gap-7">
        {userTypes.map(us => (
          <Link href='/onboarding/areas-of-interest' key={us.key}>
            <div className="border rounded-xl border-light-grey min-w-[330px] py-[64px] px-[66px]">
              <Image src={us.image} alt={us.key} className="mx-auto mb-5 h-[199px]" width={199} />
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-2">{us.title}</h3>
                <h4 className="text-base font-normal">{us.description}</h4>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}
