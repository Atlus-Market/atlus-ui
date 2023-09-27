import { Package } from '@/models/package';
import { GeneralInfoItem } from '@/app/package/[id]/components/general-info/general-info-item';
import { HiOutlineKey, HiOutlinePaperClip, HiOutlineTag } from 'react-icons/hi2';
import { formatPrice } from '@/utils/price';
import { RiFileTextLine, RiFolderOpenLine } from 'react-icons/ri';
import { groupPatentsByFamily } from '@/utils/patents';
import { pluralize } from '@/utils/words';
import { Dataroom } from '@/models/dataroom';

interface PackageGeneralInfoProps {
  atlusPackage: Package;
  dataroom: Dataroom;
}

export const PackageGeneralInfo = ({ atlusPackage, dataroom }: PackageGeneralInfoProps) => {
  const allPatents = [...atlusPackage.patents, ...atlusPackage.customPatents];

  const familyPatents = groupPatentsByFamily(allPatents);
  const familiesCount = Object.keys(familyPatents).length;
  const familiesLabel = `${familiesCount} ${pluralize('family', familiesCount)}`;

  const patentsLabel = `${allPatents.length} ${pluralize('patent', allPatents.length)}`;

  const documentsCount = dataroom.directoryTree.children.length;
  const documentsLabel = `${documentsCount} ${pluralize('document', documentsCount)}`;

  return (
    <div className="flex flex-wrap flex-col md:flex-row gap-[18px] md:gap-x-[64px] md:gap-y-[36px]">
      <GeneralInfoItem icon={HiOutlineTag} label={formatPrice(atlusPackage.priceUsd)} />
      {atlusPackage.openToLicensing && <GeneralInfoItem icon={HiOutlineKey} label="For Sale" />}
      <GeneralInfoItem label={familiesLabel} icon={RiFolderOpenLine} />
      <GeneralInfoItem label={patentsLabel} icon={RiFileTextLine} />
      <GeneralInfoItem label={documentsLabel} icon={HiOutlinePaperClip} />
    </div>
  );
};
