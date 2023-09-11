import { DropdownOption } from '@/components/ui/dropdown-list/atlus-dropdown-list';

export const statusOptions: DropdownOption[] = [
  { value: 'pending', label: 'Pending' },
  { value: 'expired', label: 'Expired' },
  { value: 'issued', label: 'Issued' },
  { value: 'abandoned', label: 'Abandoned' },
  { value: 'lapsed', label: 'Lapsed' },
];
