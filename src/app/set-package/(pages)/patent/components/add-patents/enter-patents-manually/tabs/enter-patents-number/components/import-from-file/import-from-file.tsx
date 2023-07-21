'use client';

import ImportFile from './import-file.svg';
import SelectFile from './select-file.svg';
import Image from 'next/image';
import { useRef } from 'react';

export const ImportFromFile = () => {
  const ref = useRef<any>(null);
  return (
    <div>
      <Image src={ImportFile} alt='import file' className='mb-6' />
      <Image src={SelectFile} alt='select file'
             className='hover:cursor-pointer'
             onClick={() => {
               ref.current?.click();
             }} />
      <input type='file' id='xyz' ref={ref} hidden />
    </div>
  );
};
