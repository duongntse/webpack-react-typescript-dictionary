import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import WordNotFound from './WordNotFound';

let container: any = null;

beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
});
afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});
describe("WordNotFound", () => {
    it('WordNotFound with or without message', () => {
        act(() => {
            render(<WordNotFound />, container);
        });
        expect(container.textContent).toBe(`Sorry, We can't find the word you need.`)
        act(() => {
            render(<WordNotFound message={'Word not found'} />, container);
        });
        expect(container.textContent).toBe('Word not found');
    })
});
