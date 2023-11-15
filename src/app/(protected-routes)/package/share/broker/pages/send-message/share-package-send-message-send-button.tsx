'use client';

import { AtlusButton } from '@/components/ui/button/atlus-button';
import { setActivePage } from '@/redux/features/share-package/share-package';
import { SharePackagePage } from '@/app/(protected-routes)/package/share/broker/components/commom/share-package-page';
import { useAppDispatch } from '@/redux/hooks';
import { useFormContext } from 'react-hook-form';
import { SharePackageSendMessageForm } from '@/app/(protected-routes)/package/share/broker/pages/send-message/send-message-form';

export const SharePackageSendMessageSendButton = () => {
  const dispatch = useAppDispatch();
  const formProps = useFormContext<SharePackageSendMessageForm>();
  const {
    formState: { isValid, isSubmitting, errors },
  } = formProps;

  return (
    <AtlusButton
      type="submit"
      variant="solid"
      color="orange"
      disabled={!isValid}
      isLoading={isSubmitting}
      onClick={() => dispatch(setActivePage(SharePackagePage.SendMessage))}
    >
      Send
    </AtlusButton>
  );
};
