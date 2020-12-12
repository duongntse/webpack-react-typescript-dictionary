import React from "react";
import { createRenderer } from "react-test-renderer/shallow";
import LdoceContainer from "./LdoceContainer";
// import LdoceHeadwordContainer from 'src/modules/ldoce/component/headwordSection/LdoceHeadwordContainer';
// import LdoceSenseContainer from 'src/modules/ldoce/component/sensesSection/LdoceSenseContainer';
// import LdocePosContainer from 'src/modules/ldoce/component/posSection/LdocePosContainer';
import {
    IApiLdoceByID,
} from 'src/modules/ldoce/contract/interfaces/IApiLdoceByID';
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
const fakePromiseApiLdoceByIDs: Promise<IApiLdoceByID[]> = new Promise((resolve: any) => setTimeout(() => resolve(fakeApiLdoceByIds), 0));
// const fakePromiseApiLdoceByIDsEmpty = new Promise(resolve => setTimeout(() => resolve([]), 0));
const fakeLdoce: any = {
    getApiLdoceByIds: jest.fn(() => new Promise(resolve => resolve(fakePromiseApiLdoceByIDs))),
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
const createTestProps = (props: Object) => ({
    ldoce: fakeLdoce,
    ...props
});

const setup = (propOverrides: any) => {

    const props = createTestProps(propOverrides || {});;

    const renderer = createRenderer();
    renderer.render(<LdoceContainer {...props} />);
    const output = renderer.getRenderOutput();

    return {
        props: props,
        output: output,
        renderer: renderer
    };
};

describe("components", () => {
    describe("LdoceContainer", () => {
        it("should render container", () => {
            const { output } = setup({});
            console.log(output.type);
            // expect(output.type).toBe("LdoceContainer");
            // expect(output.props.className).toBe("main");
        });
    });
});
