import { IGif } from './IGif';
import { IPagination } from './IPagination';
import { IMeta } from './IMeta';
export interface IGiphyResponse {
	data: IGif[];
	pagination: IPagination;
	meta: IMeta;
}
