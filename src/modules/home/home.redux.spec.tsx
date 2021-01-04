import { mockStore, runReducer } from '../../../test/jest.utils';
import { homeReducer, loadCharacters } from './home.redux';
import { db } from '../../utils/db/db';
import { Home, HomeActions, MockStore } from '../../../types';

jest.mock('../../utils/db/db', () => ({ db: jest.fn().mockResolvedValue({ results: ['hooray'] }) }));

describe('Home redux', () => {
    describe('loadCharacters', () => {
        let store: MockStore;

        beforeEach(() => {
            store = mockStore();
        });

        it('should invoke db util with correct arguments', async () => {
            await store.dispatch(loadCharacters(1));
            expect(db).toHaveBeenCalledTimes(1);
            expect(db).toHaveBeenCalledWith('characters', { offset: 20 });
        });

        it('should correctly update store on LOADING action', () => {
            store.dispatch({ type: HomeActions.LOADING });
            expect(runReducer(store, homeReducer)).toEqual({
                results: [...new Array(20)].map((_, i) => ({ id: i, name: '...' })),
            });
        });

        it('should dispatch LOADING & LOADED actions and update store correctly', async () => {
            await store.dispatch(loadCharacters(0));
            expect(store.getActions()).toEqual([
                { type: 'home/LOADING' },
                { payload: { results: ['hooray'] }, type: 'home/LOADED' },
            ]);
            expect(runReducer(store, homeReducer)).toEqual({ results: ['hooray'] });
        });

        it('should ONLY dispatch LOADED (not LOADING) action if existing offset matches argument', async () => {
            store = mockStore({ home: { offset: 40 } });
            await store.dispatch(loadCharacters(2));
            expect(store.getActions()).toEqual([{ payload: { results: ['hooray'] }, type: 'home/LOADED' }]);
        });

        it('should dispatch correct ERROR action and update store correctly if db util throws', async () => {
            (db as jest.Mock).mockRejectedValueOnce('error!');
            await store.dispatch(loadCharacters(0));
            expect(store.getActions()).toEqual([{ type: 'home/LOADING' }, { type: 'home/ERROR' }]);
            expect((runReducer(store, homeReducer) as Home).error).toBe(true);
        });
    });
});
