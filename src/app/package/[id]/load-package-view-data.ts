import { getAtlusServerSession } from '@/app/(auth)/session/get-atlus-server-session';
import { getDataroomByPackageIdOnServer } from '@/api/dataroom/get-dataroom-by-package-id-on-server';
import { getPackageOnServer } from '@/api/package/get-package-on-server';
import { getUserByIdOnServer } from '@/api/user/get-user-by-id-on-server';
import { User } from '@/models/user';
import { Package } from '@/models/package';
import { Dataroom } from '@/models/dataroom';

const LOAD_PACKAGE = 'Load package';
const LOAD_DATAROOM = 'Load dataroom';
const LOAD_BROKER = 'Load broker';

interface LoadDataResponse {
  broker: User | undefined;
  package: Package;
  dataroom: Dataroom | undefined;
}

export const loadPackageViewData = async (packageId: string): Promise<LoadDataResponse> => {
  const serverSession = await getAtlusServerSession();
  const hasValidSession = !!serverSession;

  if (hasValidSession) {
    console.time(LOAD_DATAROOM);
  }
  const getDataroomPromise = hasValidSession
    ? getDataroomByPackageIdOnServer(packageId).then(dataroom => {
        console.timeEnd(LOAD_DATAROOM);
        return dataroom;
      })
    : Promise.resolve(undefined);

  console.time(LOAD_PACKAGE);
  const {
    data: { package: atlusPackage },
  } = await getPackageOnServer(packageId);
  console.timeEnd(LOAD_PACKAGE);

  const isLimitedUser = hasValidSession && atlusPackage.isLimitedView;
  if (!isLimitedUser) {
    console.time(LOAD_BROKER);
  }
  const loadUserPromise = !isLimitedUser
    ? getUserByIdOnServer(atlusPackage.brokerUserId).then(user => {
        console.timeEnd(LOAD_BROKER);
        return user;
      })
    : Promise.resolve(undefined);

  const [broker, dataroom] = await Promise.all([loadUserPromise, getDataroomPromise]);

  return {
    package: atlusPackage!,
    broker,
    dataroom,
  };
};
