import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import LdoceHeadword from './LdoceHeadword';

let container: any = null;
beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement('div');
    document.body.appendChild(container);
});

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

describe('LdoceHeadword', () => {

    it('renders with or without a headword', () => {

        act(() => {
            render(<LdoceHeadword />, container);
        });
        expect(container.textContent).toBe(' ');

        act(() => {
            render(<LdoceHeadword headword={'headword'} />, container);
        });
        expect(container.textContent).toBe('headword');
    });
}
