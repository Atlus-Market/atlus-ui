import { Patent } from '@/models/patent';

export interface SearchPatentsResponse {
  customPatents: Patent[];
  patents: Patent[];
}
