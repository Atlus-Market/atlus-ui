import { SendMessageForm } from '@/app/(protected-routes)/package/[id]/components/send-message/send-message-form';
import { Package } from '@/models/package';
import { ContactBrokerElementID } from '@/app/(protected-routes)/package/contacts';

interface SendMessageProps {
  atlusPackage: Package;
}

export const SendMessage = ({ atlusPackage }: SendMessageProps) => {
  return (
    <div id={ContactBrokerElementID}>
      <SendMessageForm atlusPackage={atlusPackage} />
    </div>
  );
};
