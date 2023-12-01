import AtlusLogo from '@/components/ui/atlus-logo';
import Link from 'next/link';
import clsx from 'clsx';
import { UserHeaderMenu } from '@/components/common/header/user-header-menu';
import { SearchPackagesBar } from '@/app/search/components/search-packages-bar';

export default function Header() {
  return (
    <header
      className={clsx(
        'px-4 md:px-10 py-0 min-h-[60px] md:min-h-[80px]',
        'bg-white',
        'flex items-center justify-between gap-4',
        'min-h-[--atlus-header-height]',
        'border-b border-b-lightest-grey'
      )}
    >
      <Link href="/">
        <AtlusLogo />
      </Link>

      <SearchPackagesBar />

      <UserHeaderMenu />
    </header>
  );
}
