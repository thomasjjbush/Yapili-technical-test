import thunk from 'redux-thunk';
import configureMockStore, { MockStoreEnhanced } from 'redux-mock-store';
import { Dispatch, Store } from '../types';

export const mockStore = ({ home = {}, character = {} } = {}): MockStoreEnhanced<Partial<Store>> =>
    configureMockStore<Partial<Store>, Dispatch>([thunk])({ home, character });

export const mockTheme = {
    breakpoints: {
        desktop: 1200,
        tabletLandscape: 1024,
        tabletPortrait: 768,
    },
    colors: {
        marvelRed: 'theme.colors.marvelRed',
        darkGrey: 'theme.colors.darkGrey',
        mediumGrey: 'theme.colors.mediumGrey',
    },
};

export const runReducer = <T>(store: MockStoreEnhanced<Partial<Store>>, reducer: any, initialState?: Partial<T>): T => {
    return store.getActions().reduce(reducer, initialState);
};
