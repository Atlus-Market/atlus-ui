'use client';

import {
  AddPatentTabSelector
} from '@/app/set-package/(pages)/patent/components/add-patents/enter-patents-manually/tabs/enter-patents-number/components/tabs/add-patent-tab-selector';
import {
  EnterPatentsIds
} from '@/app/set-package/(pages)/patent/components/add-patents/enter-patents-manually/tabs/enter-patents-number/components/enter-patents-ids/enter-patents-ids';
import { useSelector } from 'react-redux';
import { selectAddPatentsActiveTab } from '@/redux/features/set-package/set-package.selectors';
import {
  EnterPatentsNumberTab
} from '@/app/set-package/(pages)/patent/components/add-patents/enter-patents-manually/tabs/enter-patents-number/components/tabs/enter-patents-number-tab';
import {
  ImportFromFile
} from '@/app/set-package/(pages)/patent/components/add-patents/enter-patents-manually/tabs/enter-patents-number/components/import-from-file/import-from-file';

export const EnterPatentsNumberBody = () => {
  const activeTab = useSelector(selectAddPatentsActiveTab);
  return (
    <>
      <AddPatentTabSelector />
      {activeTab === EnterPatentsNumberTab.EnterManually ? <EnterPatentsIds /> : <ImportFromFile />}
    </>
  );
};
