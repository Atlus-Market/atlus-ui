import { AtlusSelectFile } from '@/components/ui/select-file/atlus-select-file';
import { AtlusTitle } from '@/components/ui/typography/atlus-title';
import { AtlusSubTitle } from '@/components/ui/typography/atlus-subtitle';

export default async function DocumentsPage() {
  return (
    <div>
      <AtlusTitle text='Documents' className='!font-normal !text-2xl mb-3' />
      <AtlusSubTitle
        text='Include files and attachments in your package'
        className='!text-base !font-normal !leading-6'
      />
      <AtlusSelectFile />
    </div>
  );
}
