import * as React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from 'src/store';
import { AppContentContainer } from 'src/containers';
import { ROOT_LDOCE_CONTENT } from 'src/modules/utils';

const store = createStore(reducer);

function main(): void {
	const root = document.createElement('div');
	root.id = ROOT_LDOCE_CONTENT;
	render(
		<Provider store={store}>
			<AppContentContainer />
		</Provider>,
		document.body.appendChild(root)
	);
}

main();
