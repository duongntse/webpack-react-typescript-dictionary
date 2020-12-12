require('src/assets/img/icon34.png');
import { googleSpeakWords } from 'src/modules/utils';

// interface TypeSpeakTextFn {
//     (request: any, sender: any, sendResponse: any): boolean;
//     (request: any, sendResponse: any): boolean;
// }

const speakTextHandler = (
	request: any,
	// sender: any,
	sendResponse: any
): boolean => {
	// console.log('speakTextHandler');
	let text = request.text.trim().toLowerCase();
	let cmd = request.cmd;
	if (cmd === 'speak') {
		googleSpeakWords(text, {
			lang: 'en-UK', // 'en-US'
			voiceName: 'Google UK English Female', //'Google UK English Male',
			rate: 0.9,
		}).then(() => {
			sendResponse({ result: 'success', message: 'well done' });
		});
	}
	return true;
};

chrome.runtime.onMessage.addListener(speakTextHandler);
