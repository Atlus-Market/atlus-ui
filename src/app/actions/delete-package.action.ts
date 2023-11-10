'use server';

import { revalidatePath } from 'next/cache';
import { BrokerDashboard } from '@/constants/routes';
import { deletePackageOnServer } from '@/api/package/delete-package-on-server';
import { isAxiosError } from 'axios';
import { defaultErrorMessage } from '@/constants/api';

export const deletePackage = async (packageId: string) => {
  try {
    await deletePackageOnServer(packageId);
    revalidatePath(BrokerDashboard);
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
