import React, { ReactElement } from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { Character } from './character';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { mockStore, mockTheme } from '../../../test/jest.utils';
import { loadCharacter } from './character.redux';
import { Character as CharacterT } from '../../../types';
import { ThemeProvider } from 'styled-components';

delete global.window.location;
(global.window.location as any) = new URL('https://www.example.com/test/500');

const d = jest.fn();
const g = jest.fn();
jest.mock('react-redux', () => ({ ...jest.requireActual('react-redux'), useDispatch: jest.fn(() => d) }));
jest.mock('react-router-dom', () => ({ ...jest.requireActual('react-router-dom'), useHistory: () => ({ goBack: g }) }));
jest.mock('./character.redux', () => ({ loadCharacter: jest.fn().mockReturnValue({ type: 'MOCK_ACTION' }) }));
jest.mock('../../components/grid/grid', () => ({ Grid: ({ children }: { children: ReactElement[] }) => children }));
jest.mock('../../components/image/image', () => ({ Image: () => 'Image' }));

const ConnectedComponent = (character?: CharacterT): ReactWrapper =>
    mount(
        <Provider store={mockStore({ character })}>
            <ThemeProvider theme={mockTheme}>
                <BrowserRouter>
                    <Route path="/test/:id">
                        <Character />
                    </Route>
                </BrowserRouter>
            </ThemeProvider>
        </Provider>,
    );

describe('Character', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return loading if no data is available', () => {
        expect(ConnectedComponent().find(Character).find('p').text()).toBe('loading!');
    });

    it('should return error if data includes an error', () => {
        expect(ConnectedComponent({ error: true }).find(Character).find('p').text()).toBe('error!');
    });

    it('should invoke load character', () => {
        ConnectedComponent();
        expect(loadCharacter).toHaveBeenCalledTimes(1);
        expect(loadCharacter).toHaveBeenCalledWith(500);
        expect(d).toHaveBeenNthCalledWith(1, { type: 'MOCK_ACTION' });
    });

    describe('with data', () => {
        const store = {
            comics: { items: [{ resourceURI: '1', name: 'comic' }] },
            name: 'name',
            series: { items: [{ resourceURI: '1', name: 'comic' }] },
            stories: { items: [{ resourceURI: '1', name: 'comic' }] },
            thumbnail: { path: 'path/', extension: 'ext' },
        };

        it('should match snapshot if data exists', () => {
            const wrapper = ConnectedComponent(store);
            expect(wrapper.find(Character)).toMatchSnapshot();
        });

        it('should be able to navigate home on click', () => {
            const button = ConnectedComponent(store).find('button');
            button.simulate('click');
            expect(g).toHaveBeenCalledTimes(1);
        });
    });
});
