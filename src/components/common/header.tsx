import AtlusLogo from '@/components/ui/atlus-logo';
import Link from 'next/link';
import clsx from 'clsx';

export default function Header() {
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
    </header>
  );
}
