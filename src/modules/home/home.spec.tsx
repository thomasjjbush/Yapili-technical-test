import React, { ReactElement } from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { Home } from './home';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { mockStore, mockTheme } from '../../../test/jest.utils';
import { loadCharacters } from './home.redux';
import { Home as HomeT } from '../../../types';
import { ThemeProvider } from 'styled-components';

interface P {
    children: ReactElement;
}

const spy = jest.spyOn(window, 'scrollTo').mockImplementation();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    Link: (props: P) => props.children || 'Link',
}));
jest.mock('./home.redux', () => ({ loadCharacters: jest.fn().mockReturnValue({ type: 'MOCK_ACTION' }) }));
jest.mock('../../components/image/image', () => ({ Image: () => 'Image' }));
jest.mock('../../components/grid/grid', () => ({ Grid: (props: P) => props.children || 'Grid' }));
jest.mock('../../components/aspect-ratio/aspect-ratio', () => ({ AspectRatio: (props: P) => props.children }));
jest.mock('../../components/paginated-buttons/paginated-buttons', () => ({
    PaginatedButtons: () => 'PaginatedButtons',
}));

const ConnectedComponent = (home?: HomeT): ReactWrapper =>
    mount(
        <Provider store={mockStore({ home })}>
            <ThemeProvider theme={mockTheme}>
                <BrowserRouter>
                    <Route path="/">
                        <Home />
                    </Route>
                </BrowserRouter>
            </ThemeProvider>
        </Provider>,
    );

describe('Character', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should invoke load character and scroll top', () => {
        ConnectedComponent();
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(0, 0);
        expect(loadCharacters).toHaveBeenCalledTimes(1);
        expect(loadCharacters).toHaveBeenCalledWith(0);
    });

    it('should match snapshot', () => {
        expect(
            ConnectedComponent({
                total: 10,
                offset: 0,
                results: [
                    {
                        description: 'description',
                        id: 55,
                        name: 'name',
                        thumbnail: { path: 'path', extension: 'ext' },
                    },
                ],
            }).find(Home),
        ).toMatchSnapshot();
    });
});
