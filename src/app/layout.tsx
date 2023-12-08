import './globals.css';
import { ApiClientProvider } from '@/api/api-client-provider';
import { ReactNode } from 'react';
import { AtlusSessionProvider } from '@/app/(auth)/session/atlus-session-provider';
import { StoreProvider } from '@/redux/store-provider';
import { LogRocketProvider } from '@/app/log-rocket-provider';
import { AtlusNotificationProvider } from '@/components/ui/notification/atlus-notification-provider';
import { geologica, inter } from '@/components/ui/theme/fonts';
import clsx from 'clsx';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Atlus',
  description: '',
  formatDetection: {
    telephone: false,
    date: false,
    email: false,
    address: false,
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={clsx(inter.variable, geologica.variable)}>
      <body className="font-inter">
        <StoreProvider>
          <AtlusNotificationProvider>
            <AtlusSessionProvider>
              <ApiClientProvider>
                <LogRocketProvider>{children}</LogRocketProvider>
              </ApiClientProvider>
            </AtlusSessionProvider>
          </AtlusNotificationProvider>
        </StoreProvider>

        {/*Used in Atlus Modal*/}
        <div id="modals" />
      </body>
    </html>
  );
}
