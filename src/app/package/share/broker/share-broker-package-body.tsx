import { AtlusTabs } from '@/components/ui/tabs/atlus-tabs';
import { AtlusTab } from '@/components/ui/tabs/atlus-tab';

export const ShareBrokerPackageBody = () => {
  return (
    <AtlusTabs>
      <AtlusTab isActive={true} text="Contacts" />
      <AtlusTab isActive={false} text="Directory" />
      <AtlusTab isActive={false} text="Shared with" />
    </AtlusTabs>
  );
};
