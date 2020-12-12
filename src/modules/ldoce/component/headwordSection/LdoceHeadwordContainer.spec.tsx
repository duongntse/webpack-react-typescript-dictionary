import React from 'react'
// test file
import LdoceHeadwordContainer from './LdoceHeadwordContainer';
import LdoceHeadword from './LdoceHeadword';
import LdoceBritainIPA from './LdoceBritainIPA';
import { SpeakerContainer } from 'src/containers';

import ReactTestRenderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);

import {
    // shallow, 
    mount,
    // render, 
} from 'enzyme';



function setup() {
    const props = {
        headword: 'test', br_ipa: 'test', br_audio_url: 'test'
    }
    let store: any;
    store = mockStore({
        searchBox: { ability: 'ENABLE' }
    });
    const renderer = ReactTestRenderer.create(
        <Provider store={store}>
            <LdoceHeadwordContainer {...props} />
        </Provider>
    );

    const wrapper = mount(
        <Provider store={store}>
            <LdoceHeadwordContainer {...props} />
        </Provider>
    );

    return { props, store, renderer, wrapper }
}

describe('<LdoceHeadwordContainer />', () => {
    const { wrapper, renderer } = setup();

    it('should render with given state from redux store', () => {
        const tree = renderer.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('should render the inner LdoceHeadword', () => {

        const foundedComponent = wrapper.find(LdoceHeadword);
        expect(foundedComponent.length).toEqual(1);
    });
    it('should render the inner LdoceBritainIPA', () => {

        const foundedComponent = wrapper.find(LdoceBritainIPA);
        expect(foundedComponent.length).toEqual(1);
    });

    it('should render the inner SpeakerContainer', () => {
        const foundedComponent = wrapper.find(SpeakerContainer);
        expect(foundedComponent.length).toEqual(1);
    });

})
