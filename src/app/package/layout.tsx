import { ReactNode } from 'react';
import Header from '@/components/common/header';

export default function PackageLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col h-full">
      <Header />
      <div className="w-full h-full">{children}</div>
    </div>
  );
}
