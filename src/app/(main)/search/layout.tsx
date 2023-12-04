import { ReactNode } from 'react';
import { MainLayoutColor } from '@/components/common/header/main-layout-color';

export default function SearchLayout({ children }: { children: ReactNode }) {
  return <MainLayoutColor color="var(--color-light-grey-2)">{children}</MainLayoutColor>;
}
