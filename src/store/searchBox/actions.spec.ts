import * as types from './constants';
import * as actions from './actions';

describe('searchBox actions', () => {
	it('setSearchBoxAbility fn should create ENABLE action', () => {
		expect(actions.setSearchBoxAbility(types.ENABLE)).toEqual({
			type: types.SET_SEARCH_BOX_ABILITY,
			ability: types.ENABLE
		});
	});
	it('setSearchBoxAbility fn should create DISABLE action', () => {
		expect(actions.setSearchBoxAbility(types.DISABLE)).toEqual({
			type: types.SET_SEARCH_BOX_ABILITY,
			ability: types.DISABLE
		});
	});
});
