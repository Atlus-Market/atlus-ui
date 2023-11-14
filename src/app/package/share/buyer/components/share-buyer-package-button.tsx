import { AtlusButton } from '@/components/ui/button/atlus-button';

export const ShareBuyerPackageButton = () => {
  return (
    <AtlusButton
      // disabled={recipients.length === 0}
      variant="solid"
      color="orange"
      // onClick={() => dispatch(setActivePage(SharePackagePage.SendMessage))}
    >
      Send
    </AtlusButton>
  );
};
