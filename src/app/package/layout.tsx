import { ReactNode } from 'react';
import Header from '@/components/common/header';

export default function PackageLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Header />
      <div className="px-[18px] pb-[18px]">{children}</div>
    </div>
  );
}
