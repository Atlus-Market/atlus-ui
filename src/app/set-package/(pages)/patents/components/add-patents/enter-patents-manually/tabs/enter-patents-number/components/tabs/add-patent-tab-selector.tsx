'use client';

import { AddPatentTab } from '@/app/set-package/(pages)/patents/components/add-patents/enter-patents-manually/tabs/enter-patents-number/components/tabs/add-patent-tab';
import { useAppDispatch } from '@/redux/hooks';
import { setAddPatentsActiveTab } from '@/redux/features/set-package/set-package';
import { EnterPatentsNumberTab } from '@/app/set-package/(pages)/patents/components/add-patents/enter-patents-manually/tabs/enter-patents-number/components/tabs/enter-patents-number-tab';
import { useSelector } from 'react-redux';
import { selectAddPatentsActiveTab } from '@/redux/features/set-package/selectors/add-patents.selectors';

export const AddPatentTabSelector = () => {
  const dispatch = useAppDispatch();
  const activeTab = useSelector(selectAddPatentsActiveTab);
  return (
    <div className="flex justify-start items-center gap-[45px] mb-[40px]">
      <AddPatentTab
        isActive={activeTab === EnterPatentsNumberTab.EnterManually}
        text="Enter manually"
        onSelected={() => dispatch(setAddPatentsActiveTab(EnterPatentsNumberTab.EnterManually))}
      />
      <AddPatentTab
        isActive={activeTab === EnterPatentsNumberTab.ImportFromFile}
        text="Import from file"
        onSelected={() => dispatch(setAddPatentsActiveTab(EnterPatentsNumberTab.ImportFromFile))}
      />
    </div>
  );
};
