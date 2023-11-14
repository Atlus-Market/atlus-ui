export interface Recipient {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  companyName: string;
}

export const isCustomRecipient = (recipient: Recipient): boolean =>
  recipient.id === recipient.email;
