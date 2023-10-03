import { ReactNode } from 'react';
import Header from '@/components/common/header';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <div>{children}</div>
    </>
  );
}
