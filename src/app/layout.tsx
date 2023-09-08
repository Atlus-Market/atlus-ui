import './globals.css';
import { ApiClientProvider } from '@/api/api-client-provider';
import { ReactNode } from 'react';
import { AtlusSessionProvider } from '@/app/(auth)/session/atlus-session-provider';
import { StoreProvider } from '@/redux/store-provider';
import { LogRocketProvider } from '@/app/log-rocket-provider';
import { AtlusNotificationProvider } from '@/components/ui/notification/atlus-notification-provider';
import { inter } from '@/components/ui/theme/fonts';

export const metadata = {
  title: 'Atlus',
  description: '',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
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
