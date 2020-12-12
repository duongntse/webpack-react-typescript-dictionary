import React from 'react';
import { unmountComponentAtNode, render } from 'react-dom';

import NotifyMessage from './NotifyMessage';
import { act } from 'react-dom/test-utils';

let container: any = null;

beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
})

describe("NotifyMessage", () => {
    it('renders with or without a message', () => {
        act(() => {
            render(<NotifyMessage />, container);
        });
        expect(container.textContent).toBe(' ');
        act(() => {
            render(<NotifyMessage message={'hello guys'} />, container);
        });
        expect(container.textContent).toBe('hello guys');
    })

})
