import { SET_SEARCH_BOX_ABILITY, ENABLE } from 'src/store/searchBox/constants';

import { ISetSearchBoxAbility, TSearchBox } from 'src/store/searchBox/types';

const initialState = {
	ability: ENABLE as TSearchBox
};

export default function searchBox(
	state = { ...initialState },
	action: ISetSearchBoxAbility
) {
	switch (action.type) {
		case SET_SEARCH_BOX_ABILITY:
			return { ...state, ability: action.ability };
		default:
			return state;
	}
}
