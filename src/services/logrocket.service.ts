import LogRocket from 'logrocket';
import { isRunningProd } from '@/utils/env';

export const initLogRocket = () => {
  if (isRunningProd) {
    console.log('starting LOG ROCKET');
    LogRocket.init(process.env.NEXT_PUBLIC_LOG_ROCKET_TOKEN ?? '');
  }
};

export interface LogRocketUserData {
  id: string;
  email: string;
  name: string;
}

export const identifyUser = ({ id, name, email }: LogRocketUserData) => {
  LogRocket.identify(id, {
    name,
    email,
  });
};
