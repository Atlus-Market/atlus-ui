import { LoginResponse } from '@/api/auth/login';

export const UpdateSessionDataType = 'set_refreshed_session';

export interface UpdateSessionData {
  type: typeof UpdateSessionDataType;
  data: LoginResponse;
}
