'use client';

import { MouseEvent, ReactNode, useCallback, useState } from 'react';
import { useCopyToClipboard } from 'usehooks-ts';
import { showErrorNotification } from '@/components/ui/notification/atlus-notification';
import { HiCheck } from 'react-icons/hi2';

interface AtlusCopyToClipboardProps {
  textToCopy: string;
  children: ReactNode;
  onCopiedNode: ReactNode;
}

export const AtlusCopyToClipboard = ({
  children,
  textToCopy,
  onCopiedNode,
}: AtlusCopyToClipboardProps) => {
  const [, copy] = useCopyToClipboard();
  const [isShowingCopiedText, setIsShowingCopiedText] = useState<boolean>(false);

  const onCopyClicked = useCallback(
    async (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const result = await copy(textToCopy);
      if (!result) {
        showErrorNotification({ text: 'An error occurred while coping to clipboard' });
      } else {
        setIsShowingCopiedText(true);
        setTimeout(() => {
          setIsShowingCopiedText(false);
        }, 2000);
      }
    },
    [copy, textToCopy]
  );

  if (isShowingCopiedText) {
    return <>{onCopiedNode}</>;
  }

  return <div onClick={onCopyClicked}>{children}</div>;
};
