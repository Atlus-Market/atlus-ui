import { ReactNode } from 'react';
import { MainLayoutColor } from '@/components/common/header/main-layout-color';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return <MainLayoutColor color="var(--color-light-grey-2)">{children}</MainLayoutColor>;
}
