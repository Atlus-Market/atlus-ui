import AtlusLogo from '@/components/ui/atlus-logo';
import Link from 'next/link';

export default function Header() {
  return (
    <header className='p-6 md:p-8'>
      <Link href='/'>
        <AtlusLogo />
      </Link>
    </header>
  );
}
