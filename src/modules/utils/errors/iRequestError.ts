import { eRequestError } from './eRequestError';

export default interface iRequestError {
	readonly readyState: number;
	readonly status: number;
	readonly statusText: string;
	message: string;
	errorType: eRequestError;
}
