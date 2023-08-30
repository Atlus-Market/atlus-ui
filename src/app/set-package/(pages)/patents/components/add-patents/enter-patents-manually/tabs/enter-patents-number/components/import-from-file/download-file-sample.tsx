import FileChartSvg from '@/public/assets/icons/files/chart.svg';
import Image from 'next/image';
import { AtlusButton } from '@/components/ui/button/atlus-button';

export const DownloadFileSample = () => {
  return (
    <div className='bg-[#FCFCFC] rounded-2xl px-[27px] py-[30px] flex justify-between'>
      <div className='flex gap-4'>
        <Image src={FileChartSvg} alt='file-chart' />
        <div>
          <div className='mb-1 leading-none'>
            <span className='text-soft-black text-sm font-medium leading-[17px]'>
              Download sample XLS file
            </span>
          </div>
          <div className='leading-none'>
            <span className='text-soft-black text-xs font-normal leading-[15px]'>
              Use our template to get started
            </span>
          </div>
        </div>
      </div>
      <a href='/assets/sample/Atlus_Marketplace_Patent_Template.xlsx' download>
        <AtlusButton size='medium' variant='outline'>Download</AtlusButton>
      </a>
    </div>
  );
};
