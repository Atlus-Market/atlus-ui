import { useMutation } from '@tanstack/react-query';
import { sendMessage } from '@/api/messages/send-message';
import { showSuccessNotification } from '@/components/ui/notification/atlus-notification';

export const useSendMessage = () => {
  return useMutation({
    mutationFn: (message: string) => sendMessage({ message }),
    onSuccess: () => {
      showSuccessNotification({
        text: 'Message sent correctly!',
      });
    },
  });
};
