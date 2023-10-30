import { ReactNode } from 'react';
import { PageWrapper } from '@/components/common/page-wrapper';
import Header from '@/components/common/header/header';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <PageWrapper className="w-full md:w-[500px] mx-auto">{children}</PageWrapper>
    </>
  );
}
