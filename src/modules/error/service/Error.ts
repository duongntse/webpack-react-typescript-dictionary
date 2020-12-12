import * as _ from 'lodash';
import { TError } from './contract/TError';

export default class Error {
	public type: TError;
	public error: any;
	constructor(type: TError) {
		this.type = type;
		this.error = {};
	}

	setError = (error: any) => {
		_.merge(this.error, error);
	};
}
