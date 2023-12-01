import { getAtlusServerSession } from '@/app/(auth)/session/get-atlus-server-session';
import { getDataroomByPackageIdOnServer } from '@/api/dataroom/get-dataroom-by-package-id-on-server';
import { getPackageOnServer } from '@/api/package/get-package-on-server';
import { getUserByIdOnServer } from '@/api/user/get-user-by-id-on-server';
import { User } from '@/models/user';
import { Package } from '@/models/package';
import { Dataroom } from '@/models/dataroom';
import { getPackageAccessForUserOnServer } from '@/api/package/access/get-package-access-for-user-on-server';
import { PackageAccessValue } from '@/models/package-access-value';
import { getSepStandards } from '@/api/package/sep-standards/get-sep-standards';
import { SepStandard } from '@/models/sep-standard';
import { isCurrentUserBroker } from '@/app/(auth)/session/is-current-user-broker';

const LOAD_PACKAGE = 'Load package';

interface LoadDataResponse {
  broker: User | undefined;
  package: Package;
  dataroom: Dataroom | undefined;
  userHasAccessToPackage: boolean;
  isLimitedUser: boolean;
  isActiveUserBroker: boolean;
  sepStandards: SepStandard[];
}

export const loadPackageViewData = async (packageId: string): Promise<LoadDataResponse> => {
  const serverSession = await getAtlusServerSession();
  const hasValidSession = !!serverSession;

  let userHasAccessToPackage = false;
  if (hasValidSession) {
    const {
      data: { access },
    } = await getPackageAccessForUserOnServer(packageId);
    userHasAccessToPackage = access !== PackageAccessValue.NoAccess;
  }

  console.time(LOAD_PACKAGE);
  const {
    data: { package: atlusPackage },
  } = await getPackageOnServer(packageId);
  console.timeEnd(LOAD_PACKAGE);

  const isLimitedUser = !hasValidSession || !userHasAccessToPackage;

  const getDataroomPromise = !isLimitedUser
    ? getDataroomByPackageIdOnServer(packageId)
    : Promise.resolve(undefined);

  const loadUserPromise = !isLimitedUser
    ? getUserByIdOnServer(atlusPackage.brokerUserId)
    : Promise.resolve(undefined);

  const loadSepStandards = isLimitedUser ? Promise.resolve([]) : getSepStandards();

  const isActiveUserBrokerPromise = !isLimitedUser ? isCurrentUserBroker() : Promise.resolve(false);

  const [broker, dataroom, isActiveUserBroker, sepStandards] = await Promise.all([
    loadUserPromise,
    getDataroomPromise,
    isActiveUserBrokerPromise,
    loadSepStandards,
  ]);

  return {
    package: atlusPackage,
    broker,
    dataroom,
    userHasAccessToPackage,
    isLimitedUser,
    isActiveUserBroker,
    sepStandards,
  };
};
