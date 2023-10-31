import AtlusLogo from '@/components/ui/atlus-logo';
import Link from 'next/link';
import clsx from 'clsx';
import { UserHeaderMenu } from '@/components/common/header/user-header-menu';

export default async function Header() {
  // const serverSession = await getAtlusServerSession();
  // let user: User | undefined;

  // if (serverSession) {
  //   user = await getCurrentUserOnServer();
  // }

  return (
    <header
      className={clsx(
        'px-4 py-[10px] md:px-10 md:pt-[22px] md:pb-[21px]',
        'bg-white',
        'flex items-center justify-between',
        'min-h-[--atlus-header-height]'
      )}
    >
      <Link href="/">
        <AtlusLogo />
      </Link>

      <UserHeaderMenu user={undefined} />
    </header>
  );
}