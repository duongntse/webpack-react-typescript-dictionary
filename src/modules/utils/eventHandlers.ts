import {
	isIconInjectedFn,
	isPopupInjectedFn,
	isIconHoverFn,
	isPopupHoverFn,
} from 'src/modules/utils/common';

import {
	ICON_WIDTH,
	ICON_HEIGHT,
	APP_CONTENT_DRAGGABLE,
} from 'src/modules/utils';

interface iHandleMouseDownEvent {
	isClearContent: boolean;
}
export interface IHandleMouseUpEvent {
	showIcon: boolean;
	showPopup: boolean;
	top?: number;
	left?: number;
	headword?: string;
}

export const handleMouseDownEvent = (
	event: MouseEvent
): iHandleMouseDownEvent | undefined => {
	if (event.which === 1) {
		if (isIconHoverFn() || isPopupHoverFn()) {
			// console.log('isIconHoverFn or isPopupHoverFn were hovered');
			// do nothing with mouse down
			// then, let mouseup do the work.
		} else {
			// removeSelection();
			const isIconMouseOut = !isIconHoverFn();
			const isPopupMouseOut = !isPopupHoverFn();
			/* HIDE ICON if possible */
			// (having-HLW-or-not) + ICON + NO-POPUP + MouseOut of ICON
			if (isIconInjectedFn()) {
				if (!isPopupInjectedFn()) {
					if (isIconMouseOut) {
						return { isClearContent: true };
					}
				}
			} else {
				/*  HIDE POPUP if possible */
				// (having-HLW-or-not) + NO-ICON + POPUP + MouseOut of POPUP
				if (isPopupInjectedFn()) {
					if (isPopupMouseOut) {
						const elmDicCont = document.getElementById(
							APP_CONTENT_DRAGGABLE
						);
						if (elmDicCont) {
							const PositionY0 = event.pageY - event.clientY;
							// { x, y, top, right, bottom, left, width, height }
							// x, y, pageX, pageY
							const dicContRecObj = elmDicCont.getBoundingClientRect();
							const isLeftOut = event.pageX < dicContRecObj.left;
							const isTopOut =
								event.pageY < PositionY0 + dicContRecObj.top;
							const isRighttOut =
								event.pageX > dicContRecObj.right;
							const isBottomOut =
								event.pageY > PositionY0 + dicContRecObj.bottom;
							if (
								isLeftOut ||
								isRighttOut ||
								isTopOut ||
								isBottomOut
							) {
								return { isClearContent: true };
							}
						}
					}
				}
			}
		}

		return { isClearContent: false };
	}
	return undefined;
};
export const handleMouseUpEvent = (
	event: MouseEvent
): IHandleMouseUpEvent | undefined => {
	let isTextSelected = '';
	return (() => {
		// instance running function
		// Mouse Left
		if (event.which === 1) {
			let selectedText = getHighlighText();
			// let focusedElm = document.activeElement!.tagName;

			if (isTextSelected && isTextSelected.length > 0) {
				// text already saved in the storage, -> remove it
				isTextSelected = '';
				if (selectedText === isTextSelected) {
					// old text,
					return { showIcon: false, showPopup: false };
				}
			}

			let showIcon = false;
			let showPopup = false;
			showIcon = isShowIcon(selectedText);

			if (showIcon) {
				// window.localStorage.setItem('selectedText', selectedText);
				// if (range) range.surroundContents(decoredParent);
				return {
					showIcon,
					showPopup: false,
					top: calculateTopPosIcon(event),
					left: calculateLeftPosIcon(event),
					headword: selectedText,
				};
			}

			showPopup = isShowPopup();

			if (showPopup) {
				return {
					showPopup,
					top: calculateTopPosPopup(event),
					left: calculateLeftPosPopup(event),
					showIcon: false,
				};
			}

			return { showIcon: false, showPopup: false };
		}
		return undefined;
		// mouse right
		// do nothing
	})();
};

function calculateLeftPosPopup(event: MouseEvent): number | undefined {
	let x = 0;
	let left: number | undefined;
	if (window.innerWidth - event.x < 378) {
		x = window.innerWidth - 440;
		left = x < 0 ? 0 : x;
	}
	return left;
}

function calculateTopPosPopup(event: MouseEvent): number | undefined {
	let y = 0;
	let top: number | undefined;
	let resetY = event.pageY - event.clientY;
	let popupYPos = resetY + event.clientY;
	if (popupYPos > event.pageY - 305) {
		y = resetY + 200;
		top = y < 0 ? resetY : y;
	}
	return top;
}

function calculateTopPosIcon(event: MouseEvent): number {
	const recText = getRectOfSltText();
	const altTop = getTop(event);
	// bottom: 376.8497314453125
	// height: 18.382354736328125
	// left: 410.2366638183594
	// right: 480.51470947265625
	// top: 358.4673767089844
	// width: 70.27804565429688
	// x: 410.2366638183594
	// y: 358.4673767089844
	if (recText) {
		let resetY = event.pageY - event.clientY;
		let y = Math.round(resetY + recText.top + recText.height + 5);
		if (y + ICON_HEIGHT > resetY + window.innerHeight) {
			y = Math.round(y - 5 - recText.height - ICON_HEIGHT);
		}
		return y;
	} else {
		return altTop;
	}
}

function getTop(event: MouseEvent): number {
	const pageYOffset = window.pageYOffset;
	const wordOffset = 20;
	let y = event.pageY + wordOffset;
	const maxYOffset = pageYOffset + window.innerHeight;
	
	if (y > maxYOffset - wordOffset) {
		y = y - wordOffset ;
	} 
	
	return y;
}

// function isPadingRightOfWord(): boolean | undefined {
// 	let sel = window.getSelection();
// 	if (sel) {
// 		let word = sel.toString();
// 		if (word.trim().length > 0) {
// 			return word.trimRight().length < word.length;
// 		} else {
// 			return undefined;
// 		}
// 	} else {
// 		return undefined;
// 	}
// }

function calculateLeftPosIcon(event: MouseEvent): number {
	// const isRSpace = isPadingRightOfWord();
	// const spaceWidth = (isRSpace && 4.5) || 0;
	const recText = getRectOfSltText();
	if (recText) {
		let x = Math.round(recText.left);
		if (ICON_WIDTH > Math.round(recText.width)) {
			x = Math.round(x - (ICON_WIDTH - recText.width) / 2);
		} else if (ICON_WIDTH < Math.round(recText.width)) {
			x = Math.round(x + (recText.width - ICON_WIDTH) / 2);
		} else {
			// do nothing
		}
		x = x < 0 ? 5 : x;
		return x;
	} else {
		let x = event.pageX - Math.round(40 / 2);
		x = x < 0 ? 5 : x;
		return x;
	}
}

function isShowIcon(selectedText: string): boolean {
	/* SHOW ICON */
	// HLW: get highlighted text
	// Case-2: valid-HLW + isIconInjected + !isIconHover + !isPopupInjected ->
	// Case-3: valid-HLW + !isIconInjected + isPopupInjected + !isPopupHover -> true
	// Case-1: valid-HLW + !isIconInjected + !isPopupInjected -> true
	return isValidWord(selectedText)
		? !isIconInjectedFn()
			? !isPopupInjectedFn()
				? true
				: false
			: isPopupInjectedFn()
			? !isPopupHoverFn()
				? true
				: false
			: false
		: isIconInjectedFn()
		? !isIconHoverFn()
			? !isPopupInjectedFn()
				? true
				: false
			: false
		: false;
}

function isShowPopup(): boolean {
	/* SHOW POPUP */
	// Case-1: isIconInjected + isIconHover + !isPopupInjected -> true
	return isIconInjectedFn()
		? isIconHoverFn()
			? !isPopupInjectedFn()
				? true
				: false
			: false
		: false;
}

function isValidWord(selectedText: string): boolean {
	let isValid = false;
	const lengthOfText: number = selectedText.length;
	if (lengthOfText > 0 && lengthOfText < 60) {
		const texts = splitText(selectedText);
		if (texts.length === 1) {
			const hltext = texts[0] ? texts[0].toLowerCase().trim() : '';
			if (hltext.length > 0) {
				return true;
			}
		}
	}
	return isValid;
}

// function removeSelection(): void {
// 	// leaving the anchorNode and focusNode properties equal to null and leaving nothing selected.
// 	window.getSelection()!.removeAllRanges();
// }

function getHighlighText(): string {
	// let sel = window.getSelection();
	// range = sel && sel.getRangeAt(0).cloneRange();
	return window
		.getSelection()!
		.toString()
		.replace(/[^a-zA-Z0-9-]/g, ' ')
		.trim();
}

function getRectOfSltText(): DOMRect | undefined {
	// bottom: 376.8497314453125
	// height: 18.382354736328125
	// left: 410.2366638183594
	// right: 480.51470947265625
	// top: 358.4673767089844
	// width: 70.27804565429688
	// x: 410.2366638183594
	// y: 358.4673767089844
	let sel = window.getSelection();
	if (sel) {
		let range= sel.getRangeAt(0).cloneRange();
		let rec = range.getBoundingClientRect();
		if(rec){
			if(rec.top !== 0 && rec.right !== 0) return rec ;
		}
	}
	return undefined;
}
/* 
input: 'abcyz', 'abc?xyz', 'abc.xyz', 'abc/xyz', 'abc xyz', 'abc-xyz'
output: ["xxx", "abcyz", ...] 
*/
function splitText(selectedText: string): string[] {
	// matching non-alphabet characters: [!!@#$%^&*()<>,.?/~`] except [-]
	const regexPtn = /[^a-zA-Z0-9-]/g;
	return selectedText
		.split(regexPtn)
		.filter((txt) => txt.replace(regexPtn || /-/g, '').trim().length > 0)
		.map((txt) => txt.replace(regexPtn || /[“”]/g, ''));
}
