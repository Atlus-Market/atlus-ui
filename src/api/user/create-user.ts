import { createRequest, ProtectedEndpoint } from '@/api/api';
import { DealSize, Timeframe } from '@/models/user';

export const UserApiKey = 'user';

export interface CreateUserPayload {
  firstName: string;
  lastName: string;
  companyName: string;
  title: string;
  businessPhone: string;
  cellPhone: string;
  description: string;
  email: string;
  password: string;
  broker: boolean;
  interestAreas: number[];
  interestCountryCodes: string[];
  dealTimeframePreference: Timeframe | undefined;
  dealSizePreference: DealSize | undefined;
}

export const createUser = (userPayload: CreateUserPayload): Promise<void> => {
  return createRequest<CreateUserPayload, void>('/user', 'POST', ProtectedEndpoint.False, userPayload);
};