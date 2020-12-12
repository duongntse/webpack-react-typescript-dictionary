interface IAudio {
    lang?: string;
    type?: string;
    url?: string;
    text?: string;
}
interface IExample {
    audio?: Array<IAudio>;
    text?: string;
}
interface IPronunciation {
    audio?: Array<IAudio>;
    ipa?: string;
    lang?: string;
}
interface ISense {
    definition?: Array<string>;
    examples?: Array<IExample>;
    gramatical_examples?: Array<IGramaticalExample>;
    collocation_examples?: Array<ICollocationExample>;
    cross_references?: Array<ICrossReference>;
    related_words?: Array<string>;
    british_equivalent?: string;
    geography?: string;
    gramatical_info?: IGramaticalInfo;
    lexical_unit?: string;
    register_label?: string;
    signpost?: string;
    variants?: Array<IVariant>;
}
interface IGramaticalExample {
    examples: Array<IExample>;
    pattern?: string;
}
interface ICollocationExample {
    collocation: string;
    example: IExample;
    pattern?: string;
}

interface IGramaticalInfo {
    type: string;
}
interface ICrossReference {
    headword: string;
}
interface IInflection {
    past_participle: string;
    past_tense: string;
    present_participle: string;
    third_person_singular: string;
    plural: string;
}
interface IThesaurusBox {
    sections: Array<ISection>;
}
interface ISection {
    exponents: Array<IExponent>;
}
interface IExponent {
    definition: string;
    examples: Array<IExample>;
    exponent: string;
}
interface IEtymology {
    century?: string;
    headword?: string;
    homnum?: string;
    language?: Array<string>;
    origin?: string;
}
interface IRunOn {
    derived_form: string;
    examples: Array<IExample>;
    part_of_speech: string;
}
interface IVariant {
    lexical_variant: string;
    link_word: string;
}

export {
    IAudio,
    IExample,
    IPronunciation,
    ISense,
    IGramaticalExample,
    ICollocationExample,
    IGramaticalInfo,
    ICrossReference,
    IInflection,
    IThesaurusBox,
    IExponent,
    ISection,
    IEtymology,
    IRunOn
};
