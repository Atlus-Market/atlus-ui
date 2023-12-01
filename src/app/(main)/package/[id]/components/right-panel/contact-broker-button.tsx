'use client';

import { AtlusButton } from '@/components/ui/button/atlus-button';
import { useCallback } from 'react';
import { ContactBrokerElementID } from '@/app/(main)/package/contacts';

export const ContactBrokerButton = () => {
  const scrollToSendMessage = useCallback(() => {
    window.document.getElementById(ContactBrokerElementID)?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <AtlusButton
      variant="solid"
      color="orange"
      className="mt-6 w-full atlus-btn-45"
      onClick={scrollToSendMessage}
    >
      Contact broker
    </AtlusButton>
  );
};
