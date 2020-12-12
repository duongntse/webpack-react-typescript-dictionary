// src/store/searchBox/types.ts
import {
	SET_SEARCH_BOX_ABILITY,
	ENABLE,
	DISABLE
} from 'src/store/searchBox/constants';
export type TSearchBox = typeof ENABLE | typeof DISABLE;
// export interface ISearchBox {
// 	ability: typeof ENABLE | typeof DISABLE;
// }
export interface ISearchBoxState {
	ability: TSearchBox;
}

export interface ISetSearchBoxAbility {
	type: typeof SET_SEARCH_BOX_ABILITY;
	ability: TSearchBox;
}
