import { AtlusSplashLoader } from '@/components/ui/splash-loader/atlus-splash-loader';
import { setPackageAccessRequestOnServer } from '@/api/package/set-package-access-request-on-server';
import { isAxiosError } from 'axios';
import { defaultErrorMessage } from '@/constants/api';
import { PackageRedirectStatus } from '@/app/package/access/[requestId]/package-redirec-status';

interface PackageAccessProps {
  params: {
    requestId: string;
  };
  searchParams: {
    approve: string; // boolean string
  };
}

export default async function PackageAccessPage({ params, searchParams }: PackageAccessProps) {
  const { requestId } = params;
  const approve = searchParams.approve === 'true';

  let resultMessage: string = '';
  let resultAction = false;

  try {
    const result = await setPackageAccessRequestOnServer(requestId, { approved: approve });
    resultMessage = result.msg;
    resultAction = true;
  } catch (e) {
    if (isAxiosError(e) && e.response) {
      resultMessage = e.response.data.msg;
    } else {
      resultMessage = defaultErrorMessage;
    }
    resultAction = false;
  }

  return (
    <>
      <AtlusSplashLoader />
      <PackageRedirectStatus message={resultMessage} result={resultAction} />
    </>
  );
}
