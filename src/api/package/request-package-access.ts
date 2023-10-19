import { sleep } from '@/utils/sleep';

export const requestPackageAccess = async (packageId: string) => {
  await sleep(1000);
  // return createRequest<void, void>({
  //   url: `/package/${packageId}/request-access`,
  //   method: 'POST',
  //   isProtected: ProtectedEndpoint.True,
  // }).then(getResponseData);
};
