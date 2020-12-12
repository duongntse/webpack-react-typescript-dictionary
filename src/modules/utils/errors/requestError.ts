import { eRequestError } from './eRequestError';
import iRequestError from './iRequestError';

export default class RequestError implements iRequestError {
	public readyState: number;
	public status: number;
	public statusText: string;
	public message: string;
	public errorType: eRequestError;
	constructor(readyState: number, status: number, statusText: string) {
		this.readyState = readyState;
		this.status = status;
		this.statusText = statusText;
		this.message = this.qualifyMessage(readyState);
		this.errorType = this.qualifyRequestError(readyState);
	}
	private qualifyMessage(readyState: number): string {
		if (readyState === 4) {
			return `HTTP error: "Not Found" or "Internal Server Error."`;
		} else if (readyState === 0) {
			return 'Network error: i.e. connection refused, access denied due to CORS, etc.';
		} else {
			return 'something weird is happening.';
		}
	}
	private qualifyRequestError(readyState: number): eRequestError {
		if (readyState === 4) {
			return eRequestError.HTTP_ERROR;
		} else if (readyState === 0) {
			return eRequestError.NETWORK_ERROR;
		} else {
			return eRequestError.SOMETHING_WEIRD;
		}
	}
}
