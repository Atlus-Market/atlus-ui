import { SendMessageForm } from '@/app/package/[id]/components/send-message/send-message-form';
import { Package } from '@/models/package';

interface SendMessageProps {
  atlusPackage: Package;
}

export const SendMessage = ({ atlusPackage }: SendMessageProps) => {
  return <SendMessageForm atlusPackage={atlusPackage} />;
};
