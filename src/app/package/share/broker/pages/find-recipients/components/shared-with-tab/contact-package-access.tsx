import { PackageAccess } from '@/models/package-access';
import { AtlusAvatar } from '@/components/common/avatar/atlus-avatar';
import { AccessIconStatus } from '@/app/package/share/broker/pages/find-recipients/components/directory-tab/access-icon-status';

interface ContactAccessProp {
  packageAccess: PackageAccess;
}

export const ContactPackageAccess = ({ packageAccess }: ContactAccessProp) => {
  return (
    <div className="flex gap-3 md:gap-4 py-3 px-5 md:px-10 items-center">
      <div className="relative">
        <AtlusAvatar word={packageAccess.name} size="big" />
        <AccessIconStatus
          className="absolute bottom-0 right-[-8px]"
          packageAccess={packageAccess}
        />
      </div>
      <div className="flex flex-col justify-center gap-[2px]">
        <div className="leading-none text-black text-[13px] md:text-base">{packageAccess.name}</div>
        <div className="leading-none text-dark-grey text-xs md:text-sm">{packageAccess.email}</div>
      </div>
    </div>
  );
};
