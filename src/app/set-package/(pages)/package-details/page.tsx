import { PackageDetails } from '@/app/set-package/(pages)/package-details/package-details';
import { AtlusTitle } from '@/components/ui/typography/atlus-title';

export default async function PackageDetailsPage() {
  return (
    <div>
      <AtlusTitle text='Package Details' className='!font-normal !text-2xl mb-6' />
      <PackageDetails />
    </div>
  );
}
