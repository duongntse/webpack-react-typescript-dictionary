// const ldoceResult = require('src/services/api/JsonRawLdoceData/ldoce5_entries_headword_store');
// import { ldoceResultById } from 'src/services/api/JsonRawLdoceData/LDOCE_SAMPLE_DATA_BY_ID';
import { API_LDOCE_DOMAIN } from 'src/modules/utils/defined_ldoce_domain';
import RequestError from 'src/modules/utils/errors/requestError';
import { Error } from 'src/modules/error';
import {
    isEmpty,
    objectExtractor,
    // HEADWORD_METHOD_REQUEST_ERROR,
    HEADWORD_ID_REQUEST_ERROR
    // SEARCH_ERROR
} from 'src/modules/utils';
import {
    TGetPosesAndChoosePos,
    IDicData,
    IApiLdoceByID,
    IApiLdoceByHeadword,
    IEntry,
    IAudio,
    ISense,
    IExample
} from 'src/modules/ldoce';
import * as _ from 'lodash';
import $ from 'jquery';

export default class Ldoce {
    public headword: string;
    public origins: string[];
    public apiLdoceByIDs: Promise<IApiLdoceByID[]> | undefined;

    constructor(headword: string) {
        this.headword = headword;
        this.origins = [...this.getOriginalWords()];
        this.apiLdoceByIDs = undefined;
    }

    getApiLdoceByIds(): Promise<IApiLdoceByID[]> {
        return this.apiLdoceByIDs || new Promise(resolve => resolve([]));
    }
    search(): Promise<IApiLdoceByID[]> {
        return this.requestLdoceData()
            .then((ldoceResultById: IApiLdoceByID[]) => ldoceResultById)
            .catch(error => {
                console.log(`ERROR-Ldoce: search() : ${JSON.stringify(error)}`);
                throw error;
            });
    }
    autoSearch() {
        this.apiLdoceByIDs = this.requestLdoceData()
            .then((ldoceResultById: IApiLdoceByID[]) => ldoceResultById)
            .catch(error => {
                console.log(
                    `ERROR-Ldoce: autoSearch() : ${JSON.stringify(error)}`
                );
                throw error;
            });
        return this;
    }
    private getOriginalWords(): Array<string> {
        const lc_highlighted = this.headword.toLowerCase();
        const consonant = 'bcdfghjklmnpqrstvxzwy';
        const vowel = 'aeiou';
        let matching = [
            {
                // leaf - leaves | knife - knives
                name: 'End In F Or FE',
                regexString: 'ves$',
                test: function () {
                    return RegExp(this.regexString).test(lc_highlighted);
                },
                replaceBy: ['f', 'fe'],
                origin: [
                    lc_highlighted.substring(0, lc_highlighted.length - 3) +
                    'f',
                    lc_highlighted.substring(0, lc_highlighted.length - 3) +
                    'fe'
                ]
            },
            {
                // heroes, echoes, tomatoes, potatoes
                name: 'Ends In Consonant + O',
                regexString: `[${consonant}]oes$`,
                test: function () {
                    return RegExp(this.regexString).test(lc_highlighted);
                },
                replaceBy: '',
                origin: [lc_highlighted.substring(0, lc_highlighted.length - 2)]
            },
            {
                // cars, dogs, books, houses, apples
                name: 'Regular Noun',
                regexString: `[${consonant + vowel}]s$`,
                test: function () {
                    return RegExp(this.regexString).test(lc_highlighted);
                },
                replaceBy: '',
                origin: [lc_highlighted.substring(0, lc_highlighted.length - 1)]
            },
            {
                // buses, matches, dishes, boxes, quizzes
                name: 'Ends in S, CH, SH, X or Z',
                regexString: `(s|ch|sh|x|z)es$`,
                test: function () {
                    return RegExp(this.regexString).test(lc_highlighted);
                },
                replaceBy: '',
                origin: [lc_highlighted.substring(0, lc_highlighted.length - 2)]
            },
            {
                // days, keys, boys, guys, donkeys
                name: 'Ends in VOWEL + Y',
                regexString: `[${vowel}]ys$`,
                test: function () {
                    return RegExp(this.regexString).test(lc_highlighted);
                },
                replaceBy: '',
                origin: [lc_highlighted.substring(0, lc_highlighted.length - 1)]
            },
            {
                // city-cities, baby-babies, story-'stories'
                name: 'Ends in CONSONANT+Y',
                regexString: `[${consonant}]ies$`,
                test: function () {
                    return RegExp(this.regexString).test(lc_highlighted);
                },
                replaceBy: '',
                origin: [
                    lc_highlighted.substring(0, lc_highlighted.length - 3) + 'y'
                ]
            },
            {
                // zoo-zoos, radio-radios, stereo-stereos, video-videos, kangaroo-kangaroos
                name: 'Ends in VOWEL + O',
                regexString: `[${vowel}]o$`,
                test: function () {
                    return RegExp(this.regexString).test(lc_highlighted);
                },
                replaceBy: '',
                origin: [lc_highlighted.substring(0, lc_highlighted.length - 1)]
            },
            {
                // show-showed
                name: 'Ends in consonant + ed',
                regexString: `[${consonant + vowel}]ed$`,
                test: function () {
                    return RegExp(this.regexString).test(lc_highlighted);
                },
                replaceBy: '',
                origin: [lc_highlighted.substring(0, lc_highlighted.length - 2)]
            },

            {
                // argue-argued
                name: 'Ends in e + ed',
                regexString: `[${consonant + vowel}]ed$`,
                test: function () {
                    return RegExp(this.regexString).test(lc_highlighted);
                },
                replaceBy: '',
                origin: [lc_highlighted.substring(0, lc_highlighted.length - 1)]
            },
            {
                // infer -inferred
                name: 'Ends in vowel + consonant + consonant + ed',
                regexString: `[${consonant}]{2}ed$`,
                test: function () {
                    return RegExp(this.regexString).test(lc_highlighted);
                },
                replaceBy: '',
                origin: [lc_highlighted.substring(0, lc_highlighted.length - 3)]
            },
            {
                // study-studied
                name: 'Ends in i + ed',
                regexString: `[${consonant + vowel}]ied$`,
                test: function () {
                    return RegExp(this.regexString).test(lc_highlighted);
                },
                replaceBy: '',
                origin: [
                    lc_highlighted.substring(0, lc_highlighted.length - 3) + 'y'
                ]
            },
            {
                // use-using
                name: 'Ends in e -> Ving',
                regexString: `[${consonant + vowel}]ing$`,
                test: function () {
                    return RegExp(this.regexString).test(lc_highlighted);
                },
                replaceBy: '',
                origin: [
                    lc_highlighted.substring(0, lc_highlighted.length - 3) + 'e'
                ]
            },
            {
                // show-showing
                name: 'Ends in ing',
                regexString: `[${consonant}]ing$`,
                test: function () {
                    return RegExp(this.regexString).test(lc_highlighted);
                },
                replaceBy: '',
                origin: [lc_highlighted.substring(0, lc_highlighted.length - 3)]
            },

            {
                // show-showing
                name: 'Ends in ly',
                regexString: `[${consonant + vowel}]ly$`,
                test: function () {
                    return RegExp(this.regexString).test(lc_highlighted);
                },
                replaceBy: '',
                origin: [lc_highlighted.substring(0, lc_highlighted.length - 2)]
            },
            {
                // feasible-feasibly
                name: 'Ends in bly',
                regexString: `[${consonant + vowel}]bly$`,
                test: function () {
                    return RegExp(this.regexString).test(lc_highlighted);
                },
                replaceBy: '',
                origin: [
                    lc_highlighted.substring(0, lc_highlighted.length - 2) +
                    'le'
                ]
            },
            {
                // utilize-utilise
                name: 'Ends in se',
                regexString: `[${consonant + vowel}]se$`,
                test: function () {
                    return RegExp(this.regexString).test(lc_highlighted);
                },
                replaceBy: '',
                origin: [
                    lc_highlighted.substring(0, lc_highlighted.length - 2) +
                    'ze'
                ]
            },
            {
                // feasibility-feasible
                name: 'Ends in bility',
                regexString: `[${consonant + vowel}]bility$`,
                test: function () {
                    return RegExp(this.regexString).test(lc_highlighted);
                },
                replaceBy: '',
                origin: [
                    lc_highlighted.substring(0, lc_highlighted.length - 5) +
                    'le'
                ]
            },
            {
                // actualize-actualization
                name: 'Ends in bility',
                regexString: `[${consonant + vowel}]zation$`,
                test: function () {
                    return RegExp(this.regexString).test(lc_highlighted);
                },
                replaceBy: '',
                origin: [
                    lc_highlighted.substring(0, lc_highlighted.length - 5) + 'e'
                ]
            },
            {
                // whole-wholeness
                name: 'Ends in ness',
                regexString: `[${consonant + vowel}]ness$`,
                test: function () {
                    return RegExp(this.regexString).test(lc_highlighted);
                },
                replaceBy: '',
                origin: [lc_highlighted.substring(0, lc_highlighted.length - 4)]
            }
        ];
        let results = matching.filter(d => d.test());
        let origins = results.map(d => d.origin).flat();
        return [...new Set([lc_highlighted, this.headword, ...origins])];
        // Studied, Studying, Studies,  Showed, Shows, Showing
        //V + ed, V + ing
    }
    private requestLdoceData(): Promise<IApiLdoceByID[]> {
        return new Promise((resolve, reject) => {
            this.getRawsDataByHeadwordMethod()
                .then(this.selectRawDataByOrigins.bind(this))
                .then(this.getRawsDataByHeadwordIds.bind(this))
                .then(resolve)
                .catch(error => {
                    console.log(
                        `ERROR-requestLdoceData: ${JSON.stringify(error)}`
                    );
                    reject(error);
                });
        });
    }
    private getRawsDataByHeadwordMethod(): Promise<Array<IApiLdoceByHeadword>> {
        return new Promise((resolve, reject) => {
            const requests = this.origins.map(origin =>
                this.requestRawLdoceDataByHeadwordMethod({
                    limit: 10,
                    method: 'headword',
                    dictionary: 'ldoce5',
                    selectedText: origin
                })
            );
            Promise.all(requests)
                .then(rawDatas => {
                    resolve(rawDatas);
                })
                .catch(error => {
                    console.log(
                        `ERROR-getRawsDataByHeadwordMethod: ${JSON.stringify(
                            error
                        )}`
                    );
                    reject(error);
                });
        });
    }
    private requestRawLdoceDataByHeadwordMethod({
        limit = 10,
        method = 'headword',
        dictionary = 'ldoce5',
        selectedText = ''
    }): Promise<IApiLdoceByHeadword> {
        const PEARSON_API_URL = this.makePearsonUrl({
            limit,
            method,
            dictionary,
            selectedText
        });
        return new Promise((resolve, reject) => {
            let limitedTimeRequest: JQueryXHR | null;

            limitedTimeRequest = $.ajax({
                url: PEARSON_API_URL,
                dataType: 'json',
                success: function (rawLdoceData: IApiLdoceByHeadword) {
                    limitedTimeRequest = null;
                    resolve(rawLdoceData);
                },
                error: function (xhr) {
                    const error = new Error('NETWORK_ERROR');
                    error.setError(
                        new RequestError(
                            xhr.readyState,
                            xhr.status,
                            xhr.statusText
                        )
                    );
                    reject(error);
                }
            });

            setTimeout(() => {
                if (limitedTimeRequest) {
                    const error = new Error('TIMEOUT_ERROR');
                    reject(error);
                    console.log(`time limited: aborting ldoce request api.`);
                    limitedTimeRequest.abort();
                } else {
                    // already resolve
                    // console.log('request ldoce successful!');
                }
            }, 3000);
        });
    }
    private makePearsonUrl({
        limit = 5,
        method = 'headword',
        dictionary = 'ldoce5',
        selectedText = ''
    }): string {
        // pearson API
        let PEARSON_API_URL = `${API_LDOCE_DOMAIN}/v2/dictionaries/${dictionary}/entries?limit=${limit}&${method}=${selectedText}`;
        return PEARSON_API_URL;
    }
    private getRawsDataByHeadwordIds(
        rawLdoceData: IApiLdoceByHeadword | {}
    ): Promise<IApiLdoceByID[]> {
        return new Promise((resolve, reject) => {
            if (rawLdoceData && Object.keys(rawLdoceData).length > 0) {
                // FILTER rawLdoceData BY VALID headwords
                const ldoceDatas: Array<IEntry> = (<IApiLdoceByHeadword>(
                    rawLdoceData
                )).results.filter((result: IEntry) =>
                    this.origins.includes(result.headword)
                );

                if (ldoceDatas && ldoceDatas.length > 0) {
                    Promise.all(
                        ldoceDatas.map(res =>
                            this.makeRequestByHeadwordId(
                                API_LDOCE_DOMAIN + res.url
                            )
                        )
                    )
                        .then((rawDatas: IApiLdoceByID[]) => {
                            resolve(rawDatas);
                        })
                        .catch(error => {
                            console.log(
                                `${HEADWORD_ID_REQUEST_ERROR}: ${JSON.stringify(
                                    error
                                )}`
                            );
                            reject(error);
                        });
                } else {
                    resolve([]);
                }
            } else {
                resolve([]);
            }
        });
    }
    private makeRequestByHeadwordId = (url: string): Promise<IApiLdoceByID> => {
        return new Promise((resolve, reject) => {
            let limitedTimeRequest: JQueryXHR | null;

            limitedTimeRequest = $.ajax({
                type: 'GET',
                url: url,
                dataType: 'json',

                success: function (ldoceonlineData: IApiLdoceByID) {
                    limitedTimeRequest = null;
                    resolve(ldoceonlineData);
                },

                error: xhr => {
                    const error = new Error('NETWORK_ERROR');
                    error.setError(
                        new RequestError(
                            xhr.readyState,
                            xhr.status,
                            xhr.statusText
                        )
                    );
                    reject(error);
                }
            });

            setTimeout(function () {
                if (limitedTimeRequest) {
                    const error = new Error('TIMEOUT_ERROR');
                    reject(error);
                    console.log(`time limited: aborting ldoce request api.`);
                    limitedTimeRequest.abort();
                } else {
                    // console.log('request ldoce successful!');
                }
            }, 3000);
        });
    };
    private selectRawDataByOrigins(
        rawDatas: IApiLdoceByHeadword[]
    ): Promise<IApiLdoceByHeadword | {}> {
        return new Promise((resolve, reject) => {
            try {
                // CHECK EMPTY dataSet
                if (
                    rawDatas.filter(
                        (d: IApiLdoceByHeadword) => d.results.length > 0
                    ).length > 0
                ) {
                    if (rawDatas && rawDatas.length > 0) {
                        new Promise<IApiLdoceByHeadword[]>(resolve => {
                            resolve(
                                rawDatas.reduce(
                                    (acc, rawData: IApiLdoceByHeadword) => {
                                        let results = objectExtractor(
                                            rawData,
                                            'results'
                                        );
                                        if (
                                            results &&
                                            results.length > 0 &&
                                            results.filter((d: IEntry) =>
                                                this.origins.includes(
                                                    d.headword
                                                )
                                            ).length > 0
                                        ) {
                                            acc.push(rawData);
                                        }
                                        return acc;
                                    },
                                    [] as IApiLdoceByHeadword[]
                                )
                            );
                        })
                            .then((newRawDatas: IApiLdoceByHeadword[]) =>
                                resolve(newRawDatas[0])
                            )
                            .catch(error => reject(error));
                    } else {
                        resolve({});
                    }
                } else {
                    resolve({});
                }
            } catch (error) {
                reject(error);
            }
        });
    }
    public extractDicData = (
        dicData: IApiLdoceByID | undefined
    ): Promise<IDicData | undefined> => {
        if (dicData) {
            return Promise.all([
                this.getHeadword(dicData),
                this.getId(dicData),
                this.getPos(dicData),
                this.getAudioUrl(dicData),
                this.getIpa(dicData),
                this.getOpposite(dicData),
                this.getDefinitions(dicData),
                this.getSignposts(dicData),
                this.getExamples(dicData),
                this.getSenses(dicData)
            ]).then(results => {
                const [
                    headword,
                    id,
                    pos,
                    br_audio_url,
                    br_ipa,
                    opposite,
                    definitions,
                    signposts,
                    examples,
                    senses
                ] = results;

                return {
                    headword,
                    id,
                    pos,
                    br_audio_url,
                    br_ipa,
                    opposite,
                    definitions,
                    signposts,
                    examples,
                    senses
                } as IDicData;
            });
        } else {
            return new Promise(resolve => {
                resolve(undefined);
            });
        }
    };
    private getSenses = (dicData: IApiLdoceByID) => {
        // this.state.pre_dicData.result.senses
        return new Promise(resolve =>
            resolve(objectExtractor(dicData, 'result', 'senses'))
        );
    };
    private getId = (dicData: IApiLdoceByID): Promise<string | undefined> => {
        return new Promise(resolve => resolve(objectExtractor(dicData, 'id')));
    };
    private getHeadword = (
        dicData: IApiLdoceByID
    ): Promise<string | undefined> => {
        return new Promise(resolve =>
            resolve(objectExtractor(dicData, 'result', 'headword'))
        );
    };
    private getPos = (dicData: IApiLdoceByID): Promise<string | undefined> => {
        return new Promise(resolve =>
            resolve(objectExtractor(dicData, 'result', 'part_of_speech'))
        );
    };
    private getAudio = (
        dicData: IApiLdoceByID
    ): Promise<IAudio[] | undefined> => {
        return new Promise(resolve =>
            resolve(objectExtractor(dicData, 'result', 'audio'))
        );
    };
    private getAudioUrl = (
        dicData: IApiLdoceByID
    ): Promise<string | undefined> => {
        return new Promise(resolve =>
            resolve(objectExtractor(dicData, 'result', 'audio', 0, 'url'))
        );
    };
    private getIpa = (dicData: IApiLdoceByID): Promise<string | undefined> => {
        return new Promise(resolve =>
            resolve(
                objectExtractor(dicData, 'result', 'pronunciations', 0, 'ipa')
            )
        );
    };
    private getOpposite = (
        dicData: IApiLdoceByID
    ): Promise<string | undefined> => {
        return new Promise(resolve =>
            resolve(objectExtractor(dicData, 'result', 'opposite'))
        );
    };
    private getDefinitions = (
        dicData: IApiLdoceByID
    ): Promise<string[] | undefined> => {
        return new Promise(resolve => {
            let senses: ISense[];
            let definitions: string[] = [];
            senses = objectExtractor(dicData, 'result', 'senses') || [];
            for (let i = 0; i < senses.length; i++) {
                let def = objectExtractor(senses[i], 'definition', 0);
                if (def) definitions.push(def);
            }
            resolve(definitions);
        });
    };
    private getSignposts = (dicData: IApiLdoceByID): Promise<string[]> => {
        return new Promise((resolve, reject) => {
            try {
                let senses = objectExtractor(dicData, 'result', 'senses') || [];
                let signposts: string[] = [];
                let sp: string = '';
                for (let i = 0; i < senses.length; i++) {
                    sp = objectExtractor(senses[i], 'signpost') || '';
                    if (sp) signposts.push(sp);
                }
                resolve(signposts);
            } catch (error) {
                reject(error);
            }
        });
    };
    private getExamples = (dicData: IApiLdoceByID): Promise<IExample[]> => {
        return new Promise((resolve, reject) => {
            try {
                let senses = objectExtractor(dicData, 'result', 'senses') || [];
                let examples = [];
                for (let i = 0; i < senses.length; i++) {
                    let examp = objectExtractor(senses[i], 'examples');
                    if (examp) examples.push(examp);
                }

                resolve(examples.flat());
            } catch (error) {
                reject(error);
            }
        });
    };
    public findDicByPos = (
        ldoceDatas: IApiLdoceByID[],
        posChoseByUser: string | undefined
    ): Promise<IApiLdoceByID | undefined> => {
        return new Promise(resolve => {
            if (posChoseByUser) {
                var promiseResults = ldoceDatas.map(d => {
                    return this.getPos(d).then(foundPos =>
                        foundPos === posChoseByUser ? d : undefined
                    );
                });
                Promise.all(promiseResults).then(
                    (results: Array<IApiLdoceByID | undefined>) => {
                        resolve(results.find(d => d));
                    }
                );
            } else {
                resolve(undefined);
            }
        });
    };
    public filterLdoceThenChoosePos(): Promise<string | undefined> | undefined {
        if (this.apiLdoceByIDs) {
            return this.apiLdoceByIDs
                .then(this.filterLdoceByAvailPos)
                .then(this.choosePos);
        } else return undefined;
    }
    public filterLdoceByAvailPos = (
        ldoceDatas: IApiLdoceByID[]
    ): Promise<IApiLdoceByID[]> => {
        return new Promise(resolve => {
            resolve(
                ldoceDatas.filter(d =>
                    objectExtractor(d, 'result', 'part_of_speech')
                )
            );
        });
    };
    public getPosesAndChoosePos = (
        ldoceDatasFilterByPos: IApiLdoceByID[]
    ): Promise<TGetPosesAndChoosePos> => {
        const isData =
            ldoceDatasFilterByPos && ldoceDatasFilterByPos.length > 0;
        if (isData) {
            return Promise.all([
                this.getAllPos(ldoceDatasFilterByPos),
                this.choosePos(ldoceDatasFilterByPos)
            ]).then(results => {
                const [allPos, chosePos] = results;
                return {
                    allPos,
                    chosePos,
                    ldoceDatasFilterByPos
                };
            });
        } else {
            return new Promise(resolve => {
                // resolve({ allPos: undefined, chosePos: undefined });
                resolve({});
            });
        }
    };
    public getAllPos = (ldoceDatas: IApiLdoceByID[]): Promise<string[]> => {
        return new Promise(resolve => {
            const poses = ldoceDatas
                .map(d => objectExtractor(d, 'result', 'part_of_speech') || '')
                .filter(d => d);
            const allPos = [...new Set(poses)];
            resolve(allPos);
        });
    };
    public choosePos = (
        ldoceDatas: IApiLdoceByID[]
    ): Promise<string | undefined> => {
        return new Promise(resolve => {
            this.getDicOnAudioAndIpaAsync(ldoceDatas).then(dicData => {
                if (!isEmpty(dicData)) {
                    this.getPos(dicData!).then(chosePos => {
                        resolve(chosePos);
                    });
                } else {
                    this.getDicOn1stPos(ldoceDatas)
                        .then(this.getPos.bind(this))
                        .then(chosePos => {
                            resolve(chosePos);
                        });
                }
            });
        });
    };
    private getDicOnAudioAndIpaAsync = (
        ldoceDatas: IApiLdoceByID[]
    ): Promise<IApiLdoceByID | undefined> => {
        return new Promise(resolve => {
            let filteredLdoces: Array<Promise<
                IApiLdoceByID | undefined
            >> = ldoceDatas.map(d => {
                return Promise.all([this.getIpa(d), this.getAudio(d)]).then(
                    (results: Array<string | IAudio[] | undefined>) => {
                        if (results.every(t => t)) {
                            return d;
                        } else {
                            return undefined;
                        }
                    }
                );
            });
            Promise.all(filteredLdoces).then(results =>
                resolve(results.find(d => d))
            );
        });
    };
    private getDicOn1stPos = (
        ldoceDatas: IApiLdoceByID[]
    ): Promise<IApiLdoceByID> => {
        return new Promise(resolve => {
            resolve(
                ldoceDatas.find(d =>
                    objectExtractor(d, 'result', 'part_of_speech')
                )
            );
        });
    };
    public get1stDic = (
        ldoceDatas: IApiLdoceByID[]
    ): Promise<IApiLdoceByID | undefined> => {
        return new Promise(resolve => {
            resolve(ldoceDatas[0] || undefined);
        });
    };
}
