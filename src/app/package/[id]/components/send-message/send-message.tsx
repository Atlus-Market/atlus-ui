import { SendMessageForm } from '@/app/package/[id]/components/send-message/send-message-form';
import { Package } from '@/models/package';
import { ContactBrokerElementID } from '@/app/package/contacts';

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
