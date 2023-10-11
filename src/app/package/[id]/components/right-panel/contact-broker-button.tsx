'use client';

import { AtlusButton } from '@/components/ui/button/atlus-button';
import { useCallback } from 'react';
import { ContactBrokerElementID } from '@/app/package/contacts';

export const ContactBrokerButton = () => {
  const scrollToSendMessage = useCallback(() => {
    window.document.getElementById(ContactBrokerElementID)?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <AtlusButton variant="solid" className="mt-6 w-full" onClick={scrollToSendMessage}>
      Contact broker
    </AtlusButton>
  );
};
