'use server';

import { revalidatePath } from 'next/cache';
import { DashboardRoute } from '@/constants/routes';
import { isAxiosError } from 'axios';
import { defaultErrorMessage } from '@/constants/api';
import { setNotInterestedInPackageOnServer } from '@/api/package/access/set-not-interested-in-package-on-server';

export const notInterestedInPackageAction = async (packageId: string) => {
  try {
    await setNotInterestedInPackageOnServer(packageId);
    revalidatePath(DashboardRoute);
    return {
      errorMessage: undefined,
      error: false,
    };
  } catch (e) {
    console.log(e);
    let errorMessage = defaultErrorMessage;
    if (e && isAxiosError(e)) {
      errorMessage = e.response?.data.msg;
    }
    return {
      errorMessage,
      error: true,
    };
  }
};
