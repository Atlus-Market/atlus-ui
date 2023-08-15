import Image from 'next/image';
import UploadFileImageSvg from '@/public/assets/images/upload-file.svg';

export const AtlusSelectFile = () => {

  return (
    <div className='rounded-2xl border border-dashed border-light-grey py-12'>
      <div className='flex justify-center flex-col items-center'>
        <Image src={UploadFileImageSvg} alt='upload-file' className='mb-6' />
        <div className='mb-2 leading-none'>
          <span className='text-sm text-soft-black font-medium leading-5'>
            Select files to upload
          </span>
        </div>
        <div className='leading-none'>
          <span className='text-dark-grey text-xs font-normal leading-[15px]]'>Or drag and drop them here</span>
        </div>
      </div>
    </div>
  );
};
