import { ReactNode } from 'react';
import Header from '@/components/common/header/header';
import { PageWrapper } from '@/components/common/page-wrapper';

interface OnboardingContainerPros {
  children: ReactNode;
  footer?: ReactNode;
}

export const OnboardingContainer = ({ children, footer }: OnboardingContainerPros) => {
  return (
    <div className="flex flex-col h-full">
      <Header />
      <main className="flex justify-center h-full flex-1 overflow-y-auto flex-wrap" id="main-inner">
        <PageWrapper>{children}</PageWrapper>
      </main>
      {footer}
    </div>
  );
};
