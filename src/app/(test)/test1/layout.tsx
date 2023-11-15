import { ReactNode } from 'react';

export default function Test1Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <div className="p-5 bg-lightest-grey">{children}</div>
    </div>
  );
}
