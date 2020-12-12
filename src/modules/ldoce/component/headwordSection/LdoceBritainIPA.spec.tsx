import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import LdoceBritainIPA from './LdoceBritainIPA';

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

describe('LdoceBritainIPA', () => {
    it('renders with or without a br_ipa', () => {

        act(() => {
            render(<LdoceBritainIPA />, container);
        });
        expect(container.textContent).toBe('');

        act(() => {
            render(<LdoceBritainIPA br_ipa={'noun'} />, container);
        });
        expect(container.textContent).toBe('/noun/');
    });
})
