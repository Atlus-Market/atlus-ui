import { SendMessageForm } from '@/app/package/[id]/components/send-message/send-message-form';

interface SendMessageProps {}

export const SendMessage = ({}: SendMessageProps) => {
  return (
    <div>
      <SendMessageForm />
    </div>
  );
};
