import { AtlusButton } from '@/components/ui/button/atlus-button';
import Link from 'next/link';

export const ListClientSession = () => {
  return (
    <div className="absolute bottom-[50px]">
      <Link href="/logout">
        <AtlusButton variant="outline" color="black" id="logout">
          Logout
        </AtlusButton>
      </Link>
    </div>
  );
};
