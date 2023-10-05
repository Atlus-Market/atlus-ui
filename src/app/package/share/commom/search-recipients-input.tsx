import { AtlusInput } from '@/components/ui/input/atlus-input';
import { AtlusLoadingSpinner } from '@/components/ui/loading-spinner/atlus-loading-spinner';
import { ChangeEvent, useCallback, useMemo } from 'react';
import { AtlusTag } from '@/components/ui/tag/atlus-tag';
import { debounce } from 'lodash';

interface SearchRecipientsInputProps {
  placeholder: string;
  onSearchInputChange: (searchValue: string) => void;
  onRemoveRecipient: (recipientId: string) => void;
  recipients: any[];
  isSearching: boolean;
}

export const SearchRecipientsInput = ({
  recipients,
  isSearching,
  placeholder,
  onSearchInputChange,
  onRemoveRecipient,
}: SearchRecipientsInputProps) => {
  const onInputChanged = useCallback(
    (e: ChangeEvent<HTMLInputElement> | undefined) => {
      onSearchInputChange(e?.target?.value ?? '');
    },
    [onSearchInputChange]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onChangedDebounced = useCallback(debounce(onInputChanged, 200), [onInputChanged]);

  const selectedRecipientsTags = useMemo(() => {
    return recipients.map(contact => (
      <AtlusTag
        key={contact.id}
        text={
          <span>
            {contact.firstName} {contact.lastName}
          </span>
        }
        size="small"
        onClose={() => onRemoveRecipient(contact.id)}
        // onClose={() => dispatch(removeSelectedContact({ contactId: contact.id }))}
      />
    ));
  }, [onRemoveRecipient, recipients]);

  const hasRecipients = recipients.length > 0;
  return (
    <AtlusInput
      placeholder={!hasRecipients ? placeholder : undefined}
      onChange={onChangedDebounced}
      wrapperClassName="!mb-0"
      leftCmp={selectedRecipientsTags}
      rightIcon={isSearching && <AtlusLoadingSpinner color="orange" />}
    />
  );
};
