import { SelectCompanyLogo } from '@/components/common/company-logo/select-company-logo';
import { UploadCompanyLogoModal } from '@/components/common/company-logo/upload-company-logo-modal';
import { useToggleState } from '@/hooks/use-toggle-state';
import { useCallback, useState } from 'react';
import { CompanyLogo } from '@/components/common/company-logo/company-logo';
import { DataImageURL } from '@/types';

interface UploadCompanyLogoFieldProps {
  logoUrl?: string;
}

export const UploadCompanyLogoField = ({}: UploadCompanyLogoFieldProps) => {
  const [logoUrl, setLogoUrl] = useState('');

  ///////
  const { isOn, setOn, setOff } = useToggleState();
  const [companyLogoDataImageURL, setCompanyLogoDataImageURL] = useState<string>('');

  const onLogoSelected = useCallback(
    (dataImageURL: DataImageURL) => {
      setCompanyLogoDataImageURL(dataImageURL);
      setOn();
    },
    [setOn]
  );

  const onModalClose = useCallback(() => {
    setOff();
    setCompanyLogoDataImageURL('');
  }, [setOff]);

  const onLogoUploaded = useCallback(
    (logoUrl: string) => {
      setLogoUrl(logoUrl);
      setOff();
    },
    [setOff]
  );

  console.log('logoUrl: ', logoUrl);
  console.log('companyLogoDataImageURL: ', companyLogoDataImageURL);

  return (
    <>
      {logoUrl ? (
        <CompanyLogo logoUrl={logoUrl} onSelectFile={onLogoSelected} />
      ) : (
        <SelectCompanyLogo onSelectFile={onLogoSelected} />
      )}
      <UploadCompanyLogoModal
        isOpen={isOn}
        onClose={onModalClose}
        dataImageURL={companyLogoDataImageURL}
        onLogoUploaded={onLogoUploaded}
      />
    </>
  );
};
