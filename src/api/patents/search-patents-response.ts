import { Patent } from '@/models/patent';
import { CustomPatentData } from '@/api/patents/get-patents-simple-bulk';

export interface SearchPatentsResponse {
  customPatents: CustomPatentData[];
  patents: Patent[];
}
