import { AtlusButton } from '@/components/ui/button/atlus-button';

interface ShareBuyerPackageButtonProps {
  isLoading: boolean;
}

export const ShareBuyerPackageButton = ({ isLoading }: ShareBuyerPackageButtonProps) => {
  return (
    <AtlusButton variant="solid" color="orange" isLoading={isLoading} type="submit">
      Send
    </AtlusButton>
  );
};
