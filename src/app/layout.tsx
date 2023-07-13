import './globals.css';
import { Inter } from 'next/font/google';
import { ApiClientProvider } from '@/api/api-client-provider';
import { ReactNode } from 'react';
import { AtlusSessionProvider } from '@/app/(auth)/session/atlus-session-provider';
import { StoreProvider } from '@/redux/store-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Atlus',
  description: ''
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en'>
    <body className={inter.className}>
    <StoreProvider>
      <AtlusSessionProvider>
        <ApiClientProvider>{children}</ApiClientProvider>
      </AtlusSessionProvider>
    </StoreProvider>
    </body>
    </html>
  );
}
