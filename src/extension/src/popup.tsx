import React from 'react';
import { render } from 'react-dom';
import { AppPopupContainer } from 'src/containers';
import { ROOT_LDOCE_POPUP } from 'src/modules/utils';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from 'src/store';

const store = createStore(reducer);

function main() {
	const root = document.createElement('div');
	root.id = ROOT_LDOCE_POPUP;

	render(
		<Provider store={store}>
			<AppPopupContainer />
		</Provider>,
		document.body.appendChild(root)
	);
}

main();
