import { createRequest, ProtectedEndpoint } from '@/api/api';
import { User } from '@/models/user';

export type SearchUsersRequestPayload = {
  searchString: string;
  page?: number;
};

export interface SearchUsersResponse {
  currentPage: number;
  perPage: number;
  totalPages: number;
  users: User[];
}

export const searchUsers = (
  searchUsersRequestPayload: SearchUsersRequestPayload,
  signal?: AbortSignal
): Promise<SearchUsersResponse> => {
  return createRequest<SearchUsersRequestPayload, SearchUsersResponse>({
    url: '/users/search',
    method: 'POST',
    isProtected: ProtectedEndpoint.True,
    payload: searchUsersRequestPayload,
    signal: signal || undefined,
  });
};
