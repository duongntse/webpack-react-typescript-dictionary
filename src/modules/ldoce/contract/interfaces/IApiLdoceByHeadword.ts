import { ISense, IPronunciation } from './ICommon';
export interface IApiLdoceByHeadword {
    status: Number;
    offset: Number;
    limit: Number;
    count: Number;
    total: Number;
    url: string;
    results: IEntry[];
}
export interface IEntry {
    datasets: Array<string>;
    headword: string;
    homnum: string;
    id: string;
    part_of_speech: string;
    senses: ISense[];
    url: string;
    pronunciations: Array<IPronunciation>;
}

// export { IApiLdoceByHeadword, IEntry };
