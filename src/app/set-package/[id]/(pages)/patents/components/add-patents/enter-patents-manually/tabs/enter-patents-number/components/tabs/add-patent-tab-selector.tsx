'use client';

import { useAppDispatch } from '@/redux/hooks';
import { setAddPatentsActiveTab } from '@/redux/features/set-package/set-package';
import { EnterPatentsNumberTab } from '@/app/set-package/[id]/(pages)/patents/components/add-patents/enter-patents-manually/tabs/enter-patents-number/components/tabs/enter-patents-number-tab';
import { useSelector } from 'react-redux';
import { selectAddPatentsActiveTab } from '@/redux/features/set-package/selectors/add-patents.selectors';
import { AtlusTab } from '@/components/ui/tabs/atlus-tab';
import { AtlusTabs } from '@/components/ui/tabs/atlus-tabs';

export const AddPatentTabSelector = () => {
  const dispatch = useAppDispatch();
  const activeTab = useSelector(selectAddPatentsActiveTab);
  return (
    <AtlusTabs>
      <AtlusTab
        isActive={activeTab === EnterPatentsNumberTab.EnterManually}
        text="Enter manually"
        onSelected={() => dispatch(setAddPatentsActiveTab(EnterPatentsNumberTab.EnterManually))}
      />
      <AtlusTab
        isActive={activeTab === EnterPatentsNumberTab.ImportFromFile}
        text="Import from file"
        onSelected={() => dispatch(setAddPatentsActiveTab(EnterPatentsNumberTab.ImportFromFile))}
      />
    </AtlusTabs>
  );
};
