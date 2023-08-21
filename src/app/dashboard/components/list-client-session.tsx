import { AtlusButton } from '@/components/ui/button/atlus-button';
import Link from 'next/link';

export const ListClientSession = () => {
  return (
    <div>
      <Link href='/logout'>
        <AtlusButton>
          Logout
        </AtlusButton>
      </Link>
    </div>
  );
};
