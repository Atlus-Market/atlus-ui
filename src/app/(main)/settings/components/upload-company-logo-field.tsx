import { SelectCompanyLogo } from '@/components/common/company-logo/select-company-logo';
import { UploadCompanyLogoModal } from '@/components/common/company-logo/upload-company-logo-modal';
import { useToggleState } from '@/hooks/use-toggle-state';
import { useCallback, useState } from 'react';
import { CompanyLogo } from '@/components/common/company-logo/company-logo';
import { DataImageURL } from '@/types';

interface UploadCompanyLogoFieldProps {
  logoUrl?: string;
}

export const UploadCompanyLogoField = ({ logoUrl }: UploadCompanyLogoFieldProps) => {
  const [companyLogoUrl, setCompanyLogoUrl] = useState(logoUrl);

  if (logoUrl !== companyLogoUrl) {
    setCompanyLogoUrl(logoUrl);
  }

  const { isOn, setOn, setOff } = useToggleState();
  const [selectedCompanyLogo, setSelectedCompanyLogo] = useState<string>('');

  const onLogoSelected = useCallback(
    (dataImageURL: DataImageURL) => {
      setSelectedCompanyLogo(dataImageURL);
      setOn();
    },
    [setOn]
  );

  const onModalClose = useCallback(() => {
    setOff();
    setSelectedCompanyLogo('');
  }, [setOff]);

  return (
    <>
      {companyLogoUrl ? (
        <CompanyLogo logoUrl={companyLogoUrl} onSelectFile={onLogoSelected} />
      ) : (
        <SelectCompanyLogo onSelectFile={onLogoSelected} />
      )}
      <UploadCompanyLogoModal
        isOpen={isOn}
        onClose={onModalClose}
        dataImageURL={selectedCompanyLogo}
        onLogoUploaded={onModalClose}
      />
    </>
  );
};
