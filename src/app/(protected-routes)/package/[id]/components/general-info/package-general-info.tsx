import { Package } from '@/models/package';
import { GeneralInfoItem } from '@/app/(protected-routes)/package/[id]/components/general-info/general-info-item';
import { HiOutlineKey, HiOutlinePaperClip, HiOutlineTag } from 'react-icons/hi2';
import { formatPrice } from '@/utils/price';
import { RiFileTextLine, RiFolderOpenLine } from 'react-icons/ri';
import { pluralize } from '@/utils/words';

interface PackageGeneralInfoProps {
  atlusPackage: Package;
}

export const PackageGeneralInfo = ({ atlusPackage }: PackageGeneralInfoProps) => {
  const { numberOfDocuments, numberOfFamilies, numberOfPatentsAssets } = atlusPackage;

  const familiesLabel = `${numberOfFamilies} ${pluralize('family', numberOfFamilies)}`;
  const patentsLabel = `${numberOfPatentsAssets} ${pluralize('patent', numberOfPatentsAssets)}`;
  const documentsLabel = `${numberOfDocuments} ${pluralize('document', numberOfDocuments)}`;

  return (
    <div className="flex flex-wrap flex-col md:flex-row gap-[18px] md:gap-x-[64px] md:gap-y-[36px]">
      {atlusPackage.priceUsd && (
        <GeneralInfoItem icon={HiOutlineTag} label={formatPrice(atlusPackage.priceUsd)} />
      )}
      {atlusPackage.openToLicensing && <GeneralInfoItem icon={HiOutlineKey} label="For Sale" />}
      <GeneralInfoItem label={familiesLabel} icon={RiFolderOpenLine} />
      <GeneralInfoItem label={patentsLabel} icon={RiFileTextLine} />
      <GeneralInfoItem label={documentsLabel} icon={HiOutlinePaperClip} />
    </div>
  );
};
