import { IGifUser } from './IGifUser';
import { IGifImage } from './IGifImage';
export interface IGif {
	type: string;
	id: string;
	slug: string;
	url: string;
	bitly_url: string;
	embed_url: string;
	username: string;
	source: string;
	rating: string;
	content_url: string;
	user: IGifUser;
	source_tld: string;
	source_post_url: string;
	update_datetime: string;
	create_datetime: string;
	import_datetime: string;
	trending_datetime: string;
	images: IGifImage;
	title: string;
}
