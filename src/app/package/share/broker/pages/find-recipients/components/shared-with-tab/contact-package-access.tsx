import { PackageAccess } from '@/models/package-access';
import { AtlusAvatar } from '@/components/common/avatar/atlus-avatar';
import { AccessIconStatus } from '@/app/package/share/broker/pages/find-recipients/components/directory-tab/access-icon-status';
import { AccessStatus } from '@/app/package/share/broker/pages/find-recipients/components/shared-with-tab/access-status';
import { ChangePackageAccessButton } from '@/app/package/share/broker/pages/find-recipients/components/shared-with-tab/change-package-access/change-package-access-button';

interface ContactAccessProp {
  packageAccess: PackageAccess;
}

export const ContactPackageAccess = ({ packageAccess }: ContactAccessProp) => {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex gap-3 md:gap-4 py-3 pr-5 items-center">
        <div className="relative">
          <AtlusAvatar word={packageAccess.name} size="big" />
          <AccessIconStatus
            className="absolute bottom-0 right-[-8px]"
            packageAccess={packageAccess}
          />
        </div>
        <div className="flex flex-col justify-center gap-[2px]">
          <div className="leading-none text-black text-[13px] md:text-base">
            {packageAccess.name}
          </div>
          <div className="leading-none text-dark-grey text-xs md:text-sm">
            {packageAccess.email}
          </div>
          <div className="block md:hidden">
            <AccessStatus packageAccessValue={packageAccess.access} />
          </div>
        </div>
      </div>
      <ChangePackageAccessButton
        currentPackageAccessValue={packageAccess.access}
        email={packageAccess.email}
      />
    </div>
  );
};
