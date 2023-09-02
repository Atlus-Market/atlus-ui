'use client';

import { AtlusDropdownList } from '@/components/ui/dropdown-list/atlus-dropdown-list';
import {
  dropdownPrivateOption,
  dropdownPublicOption,
  visibilityOptions
} from '@/components/common/dropdown/visibility-options';
import { useMutation } from '@tanstack/react-query';
import { updateFile } from '@/api/dataroom/update-file';

interface DocumentVisibilityProps {
  dataroomId: string;
  documentId: string;
  isPrivate: boolean;
  onDocumentVisibilityChanged?: () => void;
}

export const DocumentVisibility = ({
                                     dataroomId,
                                     documentId,
                                     isPrivate,
                                     onDocumentVisibilityChanged
                                   }: DocumentVisibilityProps) => {

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: (visibility: boolean) => updateFile({ private: visibility }, dataroomId, documentId)
  });

  const value = isPrivate ? dropdownPrivateOption : dropdownPublicOption;
  return (
    <AtlusDropdownList
      placeholder='Visibility'
      name='visibility'
      options={visibilityOptions}
      showDropdownIndicator={true}
      isLoading={isLoading}
      isSearchable={false}
      size='small'
      value={value}
      onChange={async (valueEvent) => {
        if (valueEvent === value.value) {
          return;
        }
        await mutateAsync(!isPrivate);
        onDocumentVisibilityChanged?.();
      }}
    />
  );
};
