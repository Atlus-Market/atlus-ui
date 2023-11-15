import AtlusLogo from '@/components/ui/atlus-logo';
import Link from 'next/link';
import clsx from 'clsx';
import { UserHeaderMenu } from '@/components/common/header/user-header-menu';
import { AtlusSearchBar } from '@/components/common/search/atlus-search-bar';

export default function Header() {
  return (
    <header
      className={clsx(
        'px-4 py-[10px] md:px-10 md:pt-[22px] md:pb-[21px]',
        'bg-white',
        'flex items-center justify-between gap-4',
        'min-h-[--atlus-header-height]',
        'border-b border-b-lightest-grey'
      )}
    >
      <Link href="/">
        <AtlusLogo />
      </Link>

      <AtlusSearchBar placeholder="Search for packages" />

      <UserHeaderMenu />
    </header>
  );
}
