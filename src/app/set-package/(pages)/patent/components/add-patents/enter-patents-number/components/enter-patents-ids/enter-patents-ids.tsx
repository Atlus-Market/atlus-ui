'use client';

import {
  PatentsIdsTextArea
} from '@/app/set-package/(pages)/patent/components/add-patents/enter-patents-number/components/enter-patents-ids/patents-ids-text-area';

interface InputPatentsIdsProps {

}

export const EnterPatentsIds = ({}: InputPatentsIdsProps) => {
  return (
    <div>
      <PatentsIdsTextArea />
    </div>
  );
};
