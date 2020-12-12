import {
	IConstructedGiphy,
	IGiphyResponse,
	IGif,
} from '../../contract/interfaces';
import { isEmpty, objectExtractor, GIPHY_API_SEARCH } from 'src/modules/utils';
import RequestError from 'src/modules/utils/errors/requestError';
import { Error } from 'src/modules/error';
import $ from 'jquery';

export default class Giphy {
	public headword: string;
	public giphyData: Promise<IConstructedGiphy[]> | undefined;
	public offset: number;
	public limit: number;
	constructor(headword: string) {
		this.offset = 0;
		this.limit = 25;
		this.headword = headword;
		this.giphyData = undefined;
	}
	search(): Promise<IConstructedGiphy[]> {
		return new Promise((resolve, reject) => {
			this.requestRawGiphy(this.headword, 0)
				.then((rawData_giphy: IGiphyResponse) => {
					const constructedGiphyData = this.drawConstructedGiphyData(
						rawData_giphy
					);
					resolve(constructedGiphyData);
				})
				.catch((error) => {
					reject(error);
				});
		});
	}
	autoSearch(): void {
		this.giphyData = this.requestRawGiphy(this.headword, 0)
			.then((rawData_giphy: IGiphyResponse) => {
				const constructedGiphyData = this.drawConstructedGiphyData(
					rawData_giphy
				);
				return constructedGiphyData;
			})
			.catch((error) => {
				throw error;
			});
	}

	autoSearchBack(): void {
		this.giphyData = new Promise((resolve, reject) => {
			this.offset += this.limit;
			if (this.offset >= 0) {
				this.requestRawGiphy(this.headword, this.offset)
					.then((rawData_giphy: IGiphyResponse) => {
						const constructedGiphyData = this.drawConstructedGiphyData(
							rawData_giphy
						);
						resolve(constructedGiphyData);
					})
					.catch((error) => {
						reject(error);
					});
			} else {
				this.offset = 0;
			}
		});
	}

	autoSearchNext(): void {
		this.giphyData = new Promise((resolve, reject) => {
			this.offset += this.limit;
			this.requestRawGiphy(this.headword, this.offset)
				.then((rawData_giphy: IGiphyResponse) => {
					const constructedGiphyData = this.drawConstructedGiphyData(
						rawData_giphy
					);
					resolve(constructedGiphyData);
				})
				.catch((error) => {
					reject(error);
				});
		});
	}
	// http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=YOUR_API_KEY&limit=25
	// async requestRawGiphy(headword)
	private requestRawGiphy(
		headword: string,
		offset: number
	): Promise<IGiphyResponse> {
		return new Promise((resolve, reject) => {
			const api_key = process.env.GIPHY_API_KEY;
			const GIPHY_API_URL = `${GIPHY_API_SEARCH}q=${headword}&api_key=${api_key}&limit=${this.limit}&offset=${offset}`;
			let limitedTimeRequest: JQueryXHR | null;

			limitedTimeRequest = $.ajax({
				type: 'GET',
				url: GIPHY_API_URL,
				dataType: 'json',
				success: function (rawGiphyData: IGiphyResponse) {
					limitedTimeRequest = null;
					resolve(rawGiphyData);
				},
				error: (xhr) => {
					const error = new Error('NETWORK_ERROR');
					error.setError(
						new RequestError(
							xhr.readyState,
							xhr.status,
							xhr.statusText
						)
					);
					reject(error);
				},
			});

			setTimeout(function () {
				if (limitedTimeRequest) {
					// console.log(`time limited: aborting giphy request api.`);
					const error = new Error('TIMEOUT_ERROR');
					reject(error);
					limitedTimeRequest.abort();
				} else {
					// console.log('request giphy successful!');
				}
			}, 3000);
		});
	}

	/* 
        // constructedGiphyData(rawGiphyData)
        // [giphyObj, 'images','preview_gif','url']
        // return: constructedGiphyData or null | ERROR: null
    */
	private drawConstructedGiphyData = (
		rawGiphyData: IGiphyResponse
	): IConstructedGiphy[] => {
		try {
			/* 
            imgPath: 'images','preview_gif','url'
            label: 'title'
     */
			if (
				!isEmpty(rawGiphyData) &&
				!isEmpty(rawGiphyData.data) &&
				rawGiphyData.data.length > 0
			) {
				const constructedGiphyData: IConstructedGiphy[] = rawGiphyData.data.reduce(
					(acc, giphyObj: IGif) => {
						const imgPath: string =
							objectExtractor(
								giphyObj,
								'images',
								'preview_gif',
								'url'
							) || '';
						const label = objectExtractor(giphyObj, 'title') || '';
						const constructedData: IConstructedGiphy = {
							imgPath,
							label,
						};
						if (!!imgPath && !!label) acc.push(constructedData);
						return acc;
					},
					[] as IConstructedGiphy[]
				);
				return constructedGiphyData;
			} else return [];
		} catch (error) {
			console.log(`ERROR-drawConstructedGiphyData: ${error}`);
			throw error;
		}
	};
}
