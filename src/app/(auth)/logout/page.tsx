import { Logout } from '@/app/(auth)/logout/Logout';
import { AtlusSplashLoader } from '@/components/ui/splash-loader/atlus-splash-loader';

interface PageLayoutProps {
}

export default function LogoutPage({}: PageLayoutProps) {
  return (
    <>
      <AtlusSplashLoader />;
      <Logout />
    </>
  );
};
