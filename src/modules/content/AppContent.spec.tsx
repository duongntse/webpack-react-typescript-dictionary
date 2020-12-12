import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { ENABLE } from 'src/store/searchBox/constants';

import AppContent from './AppContent';

const mockStore = configureStore([]);

describe('My Connected React-Redux Component', () => {
	let store, component: any;

	beforeEach(() => {
		store = mockStore({
			searchBox: { ability: ENABLE }
		});
		component = renderer.create(
			<Provider store={store}>
				<AppContent />
			</Provider>
		);
	});
	it('should render with given state from Redux store', () => {
		expect(component.toJSON()).toMatchSnapshot();
	});
	it('should dispatch an action on button click', () => {});
});
