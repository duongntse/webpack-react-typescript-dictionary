import { IApiLdoceByID } from './IApiLdoceByID';
interface ILdoce {
	headword: string;
	id: string;
	pos: string;
	br_audio_url: string;
	br_ipa: string;
	opposite: string;
	definitions: string;
	signposts: Array<any>;
	examples: Array<any>;
	senses: Array<any>;
}

type TGetPosesAndChoosePos = {
	allPos?: string[];
	chosePos?: string;
	ldoceDatasFilterByPos?: IApiLdoceByID[];
};

export { ILdoce, TGetPosesAndChoosePos };
