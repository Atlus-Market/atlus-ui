'use client';

import { useAppSelector } from '@/redux/hooks';
import {
  selectAddPatentsActiveTab
} from '@/redux/features/set-package/selectors/add-patents.selectors';
import {
  EnterPatentsNumberTab
} from '@/app/set-package/(pages)/patents/components/add-patents/enter-patents-manually/tabs/enter-patents-number/components/tabs/enter-patents-number-tab';
import {
  UploadPatentsFileNextButton
} from '@/app/set-package/(pages)/patents/components/add-patents/enter-patents-manually/tabs/enter-patents-number/upload-patents-file-next-button';
import {
  SearchPatentsNextButton
} from '@/app/set-package/(pages)/patents/components/add-patents/enter-patents-manually/tabs/enter-patents-number/search-patents-next-button';

export const EnterPatentsNextButton = () => {
  const addPatentsActiveTab = useAppSelector(selectAddPatentsActiveTab);

  if (addPatentsActiveTab === EnterPatentsNumberTab.EnterManually) {
    return <SearchPatentsNextButton />;
  }

  if (addPatentsActiveTab === EnterPatentsNumberTab.ImportFromFile) {
    return <UploadPatentsFileNextButton />;
  }

  return null;
};
