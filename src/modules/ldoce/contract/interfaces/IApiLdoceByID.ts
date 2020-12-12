import {
    IAudio,
    IExample,
    IGramaticalInfo,
    IInflection,
    ISense,
    IThesaurusBox,
    IEtymology,
    IRunOn,
    IPronunciation
} from './ICommon';
interface IApiLdoceByID {
    status?: Number;
    type?: string;
    id?: string;
    url?: string;
    result?: IResult;
}

interface IResult {
    audio?: Array<IAudio>;
    datasets?: Array<string>;
    etymologies?: Array<IEtymology>;
    examples?: Array<IExample>;
    gramatical_info?: IGramaticalInfo;
    headword?: string;
    homnum?: Number;
    hyphenation?: string;
    id?: string;
    inflections?: Array<IInflection>;
    part_of_speech?: string;
    pronunciations?: Array<IPronunciation>;
    senses?: Array<ISense>;
    thesaurus_box?: IThesaurusBox;
    type?: string;
    url?: string;
    IRunOn?: Array<IRunOn>;
    opposite?: string;
}

export { IResult, IApiLdoceByID };
