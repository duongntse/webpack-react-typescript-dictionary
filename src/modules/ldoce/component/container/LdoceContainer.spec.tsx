
/* Toggle Block Comment: [Ctrl + Shift + Q]
Obsoletes: 
    wrapper.unmount();
    console.log(wrapper.debug())
    console.log(wrapper.text());
    console.log(wrapper.html());
*/

import React from 'react';

import {
    IApiLdoceByID,
} from 'src/modules/ldoce/contract/interfaces/IApiLdoceByID';
// test file
import LdoceContainer from './LdoceContainer';
import {
    // LdoceHeadwordContainer,
    // LdoceSenseContainer,
    LdocePosContainer,
} from 'src/modules/ldoce';

import {
    objectExtractor,
} from 'src/modules/utils';

import {
    // NotifyMessage,
    Empty,
    Searching
} from 'src/modules/common';
// import ReactTestRenderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);

import enzyme, {
    // shallow,
    mount,
    // render, 
} from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
const fakeApiLdoceByIds: IApiLdoceByID[] = [{
    "status": 200,
    "type": "entry",
    "id": "cqAG52bgS6",
    "url": "/v2/dictionaries/entries/cqAG52bgS6",
    "result": {
        audio: [
            {
                "lang": "British English",
                "type": "pronunciation",
                "url": "/v2/dictionaries/assets/ldoce/gb_pron/who_las2_br.mp3"
            },
            {
                "lang": "American English",
                "type": "pronunciation",
                "url": "/v2/dictionaries/assets/ldoce/us_pron/who.mp3"
            }
        ],
        datasets: [
            "ldoce5",
            "dictionary"
        ],
        etymologies: [
            {
                "century": "",
                "headword": "who",
                "language": [
                    "Old English"
                ],
                "origin": "hwa"
            }
        ],
        examples: [
            {
                "text": "Who wants another beer?"
            },
            {
                "text": "Who was that on the phone?"
            },
            {
                "text": "Oh, now I know who he is!"
            },
            {
                "text": "Ron, who usually doesn't drink alcohol, had two beers."
            },
            {
                "text": "The talk was given by a man who used to live in Russia."
            }
        ],
        headword: "who",
        hyphenation: "who",
        id: "cqAG52bgS6",
        part_of_speech: "pronoun",
        pronunciations: [
            {
                "audio": [
                    {
                        "lang": "British English",
                        "type": "pronunciation",
                        "url": "/v2/dictionaries/assets/ldoce/gb_pron/who_las2_br.mp3"
                    },
                    {
                        "lang": "American English",
                        "type": "pronunciation",
                        "url": "/v2/dictionaries/assets/ldoce/us_pron/who.mp3"
                    }
                ],
                "ipa": "huː"
            }
        ],
        "senses": [
            {
                "collocation_examples": [
                    {
                        "collocation": "who on earth/in the world etc",
                        "example": {
                            "audio": [
                                {
                                    "type": "example",
                                    "url": "/v2/dictionaries/assets/ldoce/exa_pron/p008-001814287.mp3"
                                }
                            ],
                            "text": "Who on earth would live in such a lonely place?"
                        }
                    }
                ],
                "definition": [
                    "used to ask or talk about which person is involved, or what the name of a person is"
                ],
                "examples": [
                    {
                        "audio": [
                            {
                                "type": "example",
                                "url": "/v2/dictionaries/assets/ldoce/exa_pron/p008-001814278.mp3"
                            }
                        ],
                        "text": "Who locked the door?"
                    },
                    {
                        "audio": [
                            {
                                "type": "example",
                                "url": "/v2/dictionaries/assets/ldoce/exa_pron/p008-000520083.mp3"
                            }
                        ],
                        "text": "Who do you work for?"
                    },
                    {
                        "audio": [
                            {
                                "type": "example",
                                "url": "/v2/dictionaries/assets/ldoce/exa_pron/p008-000520082.mp3"
                            }
                        ],
                        "text": "Who's that guy with your wife?"
                    },
                    {
                        "audio": [
                            {
                                "type": "example",
                                "url": "/v2/dictionaries/assets/ldoce/exa_pron/p008-001814279.mp3"
                            }
                        ],
                        "text": "They never found out who the murderer was."
                    },
                    {
                        "audio": [
                            {
                                "type": "example",
                                "url": "/v2/dictionaries/assets/ldoce/exa_pron/p008-001814280.mp3"
                            }
                        ],
                        "text": "She wondered who had sent the flowers."
                    }
                ],
                "gramatical_examples": [
                    {
                        "examples": [
                            {
                                "audio": [
                                    {
                                        "type": "example",
                                        "url": "/v2/dictionaries/assets/ldoce/exa_pron/p008-001814283.mp3"
                                    }
                                ],
                                "text": "He doesn't know who to vote for."
                            }
                        ],
                        "pattern": "who to ask/contact/blame etc"
                    }
                ]
            },
            {
                "definition": [
                    "used after a noun to show which person or which people you are talking about"
                ],
                "examples": [
                    {
                        "audio": [
                            {
                                "type": "example",
                                "url": "/v2/dictionaries/assets/ldoce/exa_pron/p008-000520088.mp3"
                            }
                        ],
                        "text": "Do you know the people who live over the road?"
                    },
                    {
                        "audio": [
                            {
                                "type": "example",
                                "url": "/v2/dictionaries/assets/ldoce/exa_pron/p008-001657298.mp3"
                            }
                        ],
                        "text": "the woman who was driving"
                    },
                    {
                        "audio": [
                            {
                                "type": "example",
                                "url": "/v2/dictionaries/assets/ldoce/exa_pron/p008-001814289.mp3"
                            }
                        ],
                        "text": "She was the one who did most of the talking."
                    }
                ]
            },
            {
                "definition": [
                    "used, after a comma in writing, to add more information about a particular person or group of people that you have just mentioned"
                ],
                "examples": [
                    {
                        "audio": [
                            {
                                "type": "example",
                                "url": "/v2/dictionaries/assets/ldoce/exa_pron/p008-000520097.mp3"
                            }
                        ],
                        "text": "I discussed it with my brother, who is a lawyer."
                    },
                    {
                        "audio": [
                            {
                                "type": "example",
                                "url": "/v2/dictionaries/assets/ldoce/exa_pron/p008-001814290.mp3"
                            }
                        ],
                        "text": "Alison Jones and her husband David, who live in Hartlepool, are celebrating their golden wedding anniversary."
                    }
                ]
            },
            {
                "definition": [
                    "used to introduce a question that shows you think something is true of everyone or of no one"
                ],
                "examples": [
                    {
                        "audio": [
                            {
                                "type": "example",
                                "url": "/v2/dictionaries/assets/ldoce/exa_pron/p008-001814295.mp3"
                            }
                        ],
                        "text": "We have the occasional argument. Who doesn't(=everyone does)?"
                    },
                    {
                        "audio": [
                            {
                                "type": "example",
                                "url": "/v2/dictionaries/assets/ldoce/exa_pron/p008-001814298.mp3"
                            }
                        ],
                        "text": "Who wants to come second(=no one does)?"
                    }
                ],
                "register_label": "informal"
            },
            {
                "definition": [
                    "used to say that someone does not have the right or the authority to say or do something"
                ],
                "examples": [
                    {
                        "audio": [
                            {
                                "type": "example",
                                "url": "/v2/dictionaries/assets/ldoce/exa_pron/p008-001657302.mp3"
                            }
                        ],
                        "text": "Who is she to order me around?"
                    }
                ],
                "lexical_unit": "who is somebody to do something?",
                "register_label": "spoken"
            },
            {
                "lexical_unit": "who's who"
            }
        ],
        "type": "entry",
        "url": "/v2/dictionaries/entries/cqAG52bgS6"
    }
}];
const fakeApiLdoceById: IApiLdoceByID = fakeApiLdoceByIds[0]
// const fakePromiseApiLdoceByIDsTimer: Promise<IApiLdoceByID[]> = new Promise((resolve: any) => setTimeout(() => resolve(fakeApiLdoceByIds), 0));
const fakePromiseApiLdoceByIDs: Promise<IApiLdoceByID[]> = new Promise((resolve: any) => resolve(fakeApiLdoceByIds));
// const fakePromiseApiLdoceByIDsEmptyTimer = new Promise(resolve => setTimeout(() => resolve([]), 0));
const fakePromiseApiLdoceByIDsEmpty = new Promise(resolve => resolve([]));
const fakeLdoce: any = {
    getApiLdoceByIds: jest.fn(() => fakePromiseApiLdoceByIDs),
    apiLdoceByIDs: fakePromiseApiLdoceByIDs,
    headword: "who",
    origins: ["who"],
    selectRawDataByOrigins: jest.fn(),
    makePearsonUrl: jest.fn(),
    filterLdoceThenChoosePos: jest.fn(),
    requestLdoceData: jest.fn(),
    getRawsDataByHeadwordMethod: jest.fn(),
    getRawsDataByHeadwordIds: jest.fn(),
    filterLdoceByAvailPos: jest.fn(),
    choosePos: jest.fn(),
    extractDicData: jest.fn(),
    findDicByPos: jest.fn(),
    get1stDic: jest.fn(),
    getAllPos: jest.fn(),
    getAudio: jest.fn(),
    getAudioUrl: jest.fn(),
    getDefinitions: jest.fn(),
    getDicOn1stPos: jest.fn(),
    getDicOnAudioAndIpaAsync: jest.fn(),
    getExamples: jest.fn(),
    getHeadword: jest.fn(),
    getId: jest.fn(),
    getIpa: jest.fn(),
    getOpposite: jest.fn(),
    getPos: jest.fn(),
    getPosesAndChoosePos: jest.fn(),
    getSenses: jest.fn(),
    getSignposts: jest.fn(),
    makeRequestByHeadwordId: jest.fn(),
    search: jest.fn(),
    autoSearch: jest.fn(),
    getOriginalWords: jest.fn(),
    requestRawLdoceDataByHeadwordMethod: jest.fn(),
};

const fakeDicdata: any = {
    headword: "test",
    id: "test id",
    pos: "test noun",
    br_audio_url: "test br audio url",
    br_ipa: "testIPA",
    opposite: "testOpposite",
    definitions: ["test"],
    signposts: ["test"],
    examples: [{ audio: { url: 'test audio url', text: 'test audio text' }, text: 'test example text' }],
    senses: objectExtractor(fakeApiLdoceById, 'result', 'senses'),
};

const createTestProps = (props: Object) => ({
    ldoce: fakeLdoce,
    ...props
});

describe('<LdoceContainer />', () => {
    enzyme.configure({ adapter: new Adapter() });
    describe('render with EMPTY status', () => {
        let store: any;
        let props: any;
        let wrapper: any;
        beforeEach(() => {  // This is Mocha; in Jest, use beforeAll
            props = createTestProps({});
            store = mockStore({
                searchBox: { ability: 'ENABLE' },
                setSearchBox: jest.fn()
            });
        });

        afterEach(() => {
            // wrapper.unmount();
        });

        it('[ldoce] and [empty apiLdoceByIDs] - Searching', async () => {
            props.ldoce.apiLdoceByIDs = fakePromiseApiLdoceByIDsEmpty;
            props.ldoce.getApiLdoceByIds = jest.fn(() => Promise.resolve([]));
            // await props.ldoce.getApiLdoceByIds.mockImplementation(() => new Promise(resolve => setTimeout(() => resolve([]), 0)));
            // props.ldoce.getApiLdoceByIds.mockReturnValueOnce([]);
            wrapper = mount(
                <Provider store={store}>
                    <LdoceContainer {...props} />
                </Provider>
            );
            const foundedComponent = wrapper.find(Searching);
            expect(foundedComponent.length).toEqual(1);

        });
        it('[ldoce] and [empty apiLdoceByIDs] => Empty', async () => {
            props.ldoce.apiLdoceByIDs = fakePromiseApiLdoceByIDsEmpty;
            props.ldoce.getApiLdoceByIds = jest.fn();
            props.ldoce.getApiLdoceByIds.mockReturnValueOnce(Promise.resolve([]));
            wrapper = mount(
                <Provider store={store}>
                    <LdoceContainer {...props} />
                </Provider>
            );
            await Promise.resolve();
            wrapper.update();
            const empty = wrapper.find(Empty);
            expect(empty.exists()).toBe(true);
            expect(empty.text()).toEqual(`"${props.ldoce.headword}" was not found from LDOCE!`);
        });
        it('[apiLdoceByIDs] & [empty ldoceDatasFilterByPos] => Empty', async () => {
            props.ldoce.apiLdoceByIDs = fakePromiseApiLdoceByIDs;
            props.ldoce.getApiLdoceByIds = jest.fn();
            props.ldoce.getApiLdoceByIds.mockReturnValueOnce(Promise.resolve(fakeApiLdoceByIds));
            props.ldoce.filterLdoceByAvailPos = jest.fn()
            props.ldoce.filterLdoceByAvailPos.mockReturnValueOnce(Promise.resolve([]));

            wrapper = mount(
                <Provider store={store}>
                    <LdoceContainer {...props} />
                </Provider>
            );

            await Promise.resolve().then();
            wrapper.update();

            const empty = wrapper.find(Empty);
            expect(empty.exists()).toBe(true);
            expect(empty.text()).toEqual(`"${props.ldoce.headword}" was not found from LDOCE!`);
        });
        it('[empty chosePos] and [empty allPos] - Empty', async () => {
            /* 
                + getApiLdoceByIds: data
                + filterLdoceByAvailPos: data
                + getAllPos & choosePos: 
                    1 - chosePos = null -> dicData = null -> Empty
                        get1stDic(originLdoceDatas): apiLdoceById
                        extractDicData(apiLdoceById): dicData
                        dicData = null
                        => Empty
            */
            props.ldoce.apiLdoceByIDs = fakePromiseApiLdoceByIDs;
            props.ldoce.getApiLdoceByIds = jest.fn();
            props.ldoce.filterLdoceByAvailPos = jest.fn()
            props.ldoce.getAllPos = jest.fn();
            props.ldoce.choosePos = jest.fn();
            props.ldoce.get1stDic = jest.fn();
            props.ldoce.extractDicData = jest.fn();

            props.ldoce.getApiLdoceByIds.mockReturnValueOnce(Promise.resolve(fakeApiLdoceByIds));
            props.ldoce.filterLdoceByAvailPos.mockReturnValueOnce(Promise.resolve(fakeApiLdoceByIds));
            props.ldoce.choosePos.mockReturnValueOnce(Promise.resolve(null));
            props.ldoce.getAllPos.mockReturnValueOnce(Promise.resolve(['test']));
            props.ldoce.get1stDic.mockReturnValueOnce(Promise.resolve(fakeApiLdoceById));
            props.ldoce.extractDicData.mockReturnValueOnce(Promise.resolve(null));

            wrapper = mount(
                <Provider store={store}>
                    <LdoceContainer {...props} />
                </Provider>
            );

            await Promise.resolve().then().then().then().then().then();
            wrapper.update();

            const empty = wrapper.find(Empty);
            expect(empty.exists()).toBe(true);
            expect(empty.text()).toEqual(`"${props.ldoce.headword}" was not found from LDOCE!`);
        });
    });

    describe('render with READY status', () => {
        let store: any;
        let props: any;
        let wrapper: any;
        beforeEach(() => {  // This is Mocha; in Jest, use beforeAll
            props = createTestProps({});
            store = mockStore({
                searchBox: { ability: 'ENABLE' },
                setSearchBox: jest.fn()
            });
        });
        afterEach(() => {
            // wrapper.unmount();
        });
        it('should render LdoceHeadwordContainer', async () => {
            props.ldoce.apiLdoceByIDs = fakePromiseApiLdoceByIDs;
            props.ldoce.getApiLdoceByIds = jest.fn();
            props.ldoce.filterLdoceByAvailPos = jest.fn()
            props.ldoce.getAllPos = jest.fn();
            props.ldoce.choosePos = jest.fn();
            props.ldoce.get1stDic = jest.fn();
            props.ldoce.extractDicData = jest.fn();

            props.ldoce.getApiLdoceByIds.mockReturnValueOnce(Promise.resolve(fakeApiLdoceByIds));
            props.ldoce.filterLdoceByAvailPos.mockReturnValueOnce(Promise.resolve(fakeApiLdoceByIds));
            props.ldoce.choosePos.mockReturnValueOnce(Promise.resolve("testPos"));
            props.ldoce.getAllPos.mockReturnValueOnce(Promise.resolve(['testPos']));
            props.ldoce.get1stDic.mockReturnValueOnce(Promise.resolve(fakeApiLdoceById));
            props.ldoce.extractDicData.mockReturnValueOnce(Promise.resolve(fakeDicdata));

            wrapper = mount(
                <Provider store={store}>
                    <LdoceContainer {...props} />
                </Provider>
            );

            // 6 (Six) asynchronous function need to await
            await Promise.resolve().then().then().then().then().then();
            wrapper.update();
            // console.log(wrapper.html());
            // const ldoceHeadwordContainer = wrapper.find(LdoceHeadwordContainer);
            // const ldoceSenseContainer = wrapper.find(LdoceSenseContainer);
            // const ldocePosContainer = wrapper.find(LdocePosContainer);
            // expect(ldoceHeadwordContainer.exists()).toBe(true);
            // expect(ldoceSenseContainer.exists()).toBe(true);
            // expect(ldocePosContainer.exists()).toBe(true);

            expect(wrapper.contains(LdocePosContainer)).toBe(true);

        });

        it('should render LdoceSenseContainer', () => {
            // const foundedComponent = wrapper.find(LdoceSenseContainer);
            // expect(foundedComponent.length).toEqual(1);
        });

        it('should render LdocePosContainer', () => {
            // const foundedComponent = wrapper.find(LdocePosContainer);
            // expect(foundedComponent.length).toEqual(1);
        });
    });

    describe('render with ERROR status', () => {
        it('Too Slow Internet Connection', () => {
            // 
        });
        it('No Internet Connection', () => {
            // 
        });
    });

})
