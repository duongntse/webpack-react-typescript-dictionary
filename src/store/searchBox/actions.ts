import { SET_SEARCH_BOX_ABILITY } from 'src/store/searchBox/constants';
import { ISetSearchBoxAbility, TSearchBox } from 'src/store/searchBox/types';
export const setSearchBoxAbility = (
	ability: TSearchBox
): ISetSearchBoxAbility => ({
	ability,
	type: SET_SEARCH_BOX_ABILITY
});
