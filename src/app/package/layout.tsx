import { ReactNode } from 'react';
import Header from '@/components/common/header';

export default function PackageLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
