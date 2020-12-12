import $ from 'jquery';
import {
    ROOT_LDOCE_CONTENT,
    ICON_ID,
    // POPUP_ID,
    DICTIONARY_CONTAINER_ID,
    APP_CONTENT_DRAGGABLE,
    APP_ID
} from 'src/modules/utils/defined_extension_name';

export function isIconInjectedFn(): boolean {
    // const iconId = `#${ROOT_LDOCE_CONTENT} #${APP_ID} #${ICON_ID}`;
    const iconId = ['', ROOT_LDOCE_CONTENT, APP_ID, ICON_ID].join(' #').trim();
    return $(iconId).length > 0 ? true : false;
}

export function isPopupInjectedFn(): boolean {
    // const popupId = `#${ROOT_LDOCE} #${CONTAINER_ID} #${POPUP_ID}`;
    const popupId = ['', ROOT_LDOCE_CONTENT, APP_ID, DICTIONARY_CONTAINER_ID]
        .join(' #')
        .trim();
    return $(popupId).length > 0 ? true : false;
}

export function isIconHoverFn(): boolean {
    const iconHoverName = `#${ICON_ID}:hover`;
    return isTargetHover(iconHoverName);
}

export function isPopupHoverFn(): boolean {
    const popupHoverName = `#${APP_CONTENT_DRAGGABLE}:hover`;
    return isTargetHover(popupHoverName);
}

export function isTargetHover(name: string): boolean {
    return $(name).length > 0 ? true : false;
}

// export function isClickOutOfPopup(name: string): boolean {

//     return true;
// }

// Obsoleted: extractRawData
// TEST: ['',null,undefined,{},[],0].every(isEmpty) === true;
// EMPTY: return true
type nullable = null | '' | undefined | {} | [] | 0;
export function isEmpty(val: nullable): boolean {
    if (val as object) {
        return !Object.keys(val as object).length;
    } else {
        return !val;
    }
}

interface TypedExtractor {
    <T, K1>(object: T, key1: K1): InstanceType<any>;
    <T, K1, K2>(
        object: T,
        key1: K1,
        key2: K2
    ): InstanceType<any>;
    <
        T,
        K1,
        K2,
        K3
        >(
        object: T,
        key1: K1,
        key2: K2,
        key3: K3
    ): InstanceType<any>;
    <
        T,
        K1,
        K2,
        K3,
        K4
        >(
        object: T,
        key1: K1,
        key2: K2,
        key3: K3,
        key4: K4
    ): InstanceType<any>;
    <
        T,
        K1,
        K2,
        K3,
        K4,
        K5
        >(
        object: T,
        key1: K1,
        key2: K2,
        key3: K3,
        key4: K4,
        key5: K5
    ): InstanceType<any>;
    <
        T,
        K1,
        K2,
        K3,
        K4,
        K5,
        K6
        >(
        object: T,
        key1: K1,
        key2: K2,
        key3: K3,
        key4: K4,
        key5: K5,
        key6: K6
    ): InstanceType<any>;
    <
        T,
        K1,
        K2,
        K3,
        K4,
        K5,
        K6,
        K7
        >(
        object: T,
        key1: K1,
        key2: K2,
        key3: K3,
        key4: K4,
        key5: K5,
        key6: K6,
        key7: K7
    ): InstanceType<any>;
    <
        T,
        K1,
        K2,
        K3,
        K4,
        K5,
        K6,
        K7,
        K8
        >(
        object: T,
        key1: K1,
        key2: K2,
        key3: K3,
        key4: K4,
        key5: K5,
        key6: K6,
        key7: K7,
        key8: K8
    ): InstanceType<any>;
    <
        T,
        K1,
        K2,
        K3,
        K4,
        K5,
        K6,
        K7,
        K8,
        K9
        >(
        object: T,
        key1: K1,
        key2: K2,
        key3: K3,
        key4: K4,
        key5: K5,
        key6: K6,
        key7: K7,
        key8: K8,
        key9: K9
    ): InstanceType<any>;
    <
        T,
        K1,
        K2,
        K3,
        K4,
        K5,
        K6,
        K7,
        K8,
        K9,
        K10
        >(
        object: T,
        key1: K1,
        key2: K2,
        key3: K3,
        key4: K4,
        key5: K5,
        key6: K6,
        key7: K7,
        key8: K8,
        key9: K9,
        key10: K10
    ): InstanceType<any>;
}
/* 
objectExtractor(dicData, 'result', 'pronunciations', 0, 'ipa')
dicData.result.pronunciations
*/
export const objectExtractor: TypedExtractor = (
    o: any,
    ...props: (string | number)[]
): any => {
    return props.reduce((acc, val) => (acc && acc[val]) || undefined, o);
};

/* googleSpeakWords(selectedText, {
			lang: 'en-US',
			voiceName: 'Google UK English Male',
			rate: 1.0
        }); */
export type OptionGSW = {
    lang?: string;
    voiceName?: string;
    rate?: number;
    extensionId?: string;
};
export function googleSpeakWords(
    words: string,
    options: OptionGSW
): Promise<string> {
    listGoogleVoiceName();
    return new Promise((resolve, reject) => {
        try {
            chrome.tts.speak(words, options, () => resolve('spoken'));
        } catch (error) {
            reject(error);
        }
    });
}

function listGoogleVoiceName(): void {
    chrome.tts.getVoices(function (voices: OptionGSW[]) {
        if (voices && voices.length > 0) {
            for (var i = 0; i < voices.length; i++) {
                if (
                    ['en-US', 'en-GB'].includes(
                        voices[i] ? voices[i].lang || '' : ''
                    )
                ) {
                    console.log('Voice ' + i + ':');
                    console.log('  name: ' + voices[i].voiceName);
                    console.log('  lang: ' + voices[i].lang);
                    console.log('  extension id: ' + voices[i].extensionId);
                }
            }
        }
    });
}

// audioElementList: NodeList
export function stopAudios(
    audioElementList: Array<HTMLMediaElement> | null
): void {
    if (audioElementList) {
        audioElementList.forEach(x => {
            x.pause();
            x.currentTime = 0;
        });
    }
}

// audioElement: Element
export function playAudio(
    audioElement: HTMLMediaElement | null
): Promise<boolean> {
    if (audioElement) {
        audioElement.load();
        let playPromise = audioElement.play();

        return playPromise
            .then(_ => {
                return true;
                // Automatic playback started!
                // Show playing UI
                // audioElement.pause();
            })
            .catch(error => {
                console.log(`ERROR-playAudio: ${JSON.stringify(error)}`);
                throw error;
                // Auto-play was prevented
                // Show paused UI
            });
    } else {
        return new Promise(resolve => resolve(false));
    }
}
// replace text: (=abc...xyz) by ''
// cutMoreDescriptionInExample(text)
export function cutMoreDescriptionInExample(text: string): string {
    return text.replace(/(\(=\w+)( ((\w+ )+))?(\w+\))/, '');
}
