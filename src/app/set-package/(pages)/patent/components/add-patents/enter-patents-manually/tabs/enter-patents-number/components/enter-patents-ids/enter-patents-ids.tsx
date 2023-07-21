'use client';

import {
  PatentsIdsForm
} from '@/app/set-package/(pages)/patent/components/add-patents/enter-patents-manually/tabs/enter-patents-number/components/enter-patents-ids/patents-ids-form';
import { useSelector } from 'react-redux';
import {
  selectEnterPatentsIdsManuallyState
} from '@/redux/features/set-package/set-package.selectors';
import { useAppDispatch } from '@/redux/hooks';
import { useMemo, useRef } from 'react';
import { debounce } from 'lodash';
import {
  EnterPatentsIdsManuallyForm,
  updateEnterPatentsIdsManuallyForm
} from '@/redux/features/set-package/set-package';

interface InputPatentsIdsProps {
}

export const EnterPatentsIds = ({}: InputPatentsIdsProps) => {
  const enterPatentsIdsManually = useSelector(selectEnterPatentsIdsManuallyState);
  const dispatch = useAppDispatch();
  const dispatchRef = useRef<typeof dispatch>(dispatch);
  dispatchRef.current = dispatch;

  const updateForm = useMemo(() => debounce((enterPatentsIdsManuallyForm: EnterPatentsIdsManuallyForm) => {
    return dispatchRef.current(updateEnterPatentsIdsManuallyForm(enterPatentsIdsManuallyForm));
  }, 250), []);

  return (
    <div>
      <PatentsIdsForm
        initialFormValues={enterPatentsIdsManually.form.formValues}
        onFormChange={updateForm}
      />
      <span className='text-xs leading-normal text-dark-grey block ml-[13px]'>
      Patent numbers must include country code (US, CN, etc.), PCT, or WO as prefixes.
    </span>
    </div>
  );
};
