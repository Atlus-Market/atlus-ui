'use client';

import { AtlusButton } from '@/components/ui/button/atlus-button';
import { setActivePage } from '@/redux/features/share-package/share-package';
import { SharePackagePage } from '@/app/package/share/broker/components/commom/share-package-page';
import { useAppDispatch } from '@/redux/hooks';
import { useFormContext } from 'react-hook-form';
import { SharePackageSendMessageForm } from '@/app/package/share/broker/pages/send-message/send-message-form';

export const SharePackageSendMessageSendButton = () => {
  const dispatch = useAppDispatch();
  const formProps = useFormContext<SharePackageSendMessageForm>();
  const {
    getValues,
    formState: { isValid, errors },
  } = formProps;

  console.log('errors: ', errors);
  console.log('values: ', getValues());

  return (
    <AtlusButton
      type="submit"
      variant="solid"
      disabled={!isValid}
      onClick={() => dispatch(setActivePage(SharePackagePage.SendMessage))}
    >
      Send
    </AtlusButton>
  );
};
