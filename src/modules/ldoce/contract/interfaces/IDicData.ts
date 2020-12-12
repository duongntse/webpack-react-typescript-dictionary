import { IExample, ISense } from './ICommon';
import { IApiLdoceByID } from './IApiLdoceByID';

interface IDicData {
	headword: string;
	id: string;
	pos: string;
	br_audio_url: string;
	br_ipa: string;
	opposite: string;
	definitions: string[];
	signposts: string[];
	examples: IExample[];
	senses: ISense[];
}

type TGetPosesAndChoosePos = {
	allPos?: string[];
	chosePos?: string;
	ldoceDatasFilterByPos?: IApiLdoceByID[];
};

export { IDicData, TGetPosesAndChoosePos };
