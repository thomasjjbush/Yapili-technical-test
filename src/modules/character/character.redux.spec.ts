import { mockStore, runReducer } from '../../../test/jest.utils';
import { characterReducer, loadCharacter } from './character.redux';
import { db } from '../../utils/db/db';
import { CharacterActions, MockStore } from '../../../types';

jest.mock('../../utils/db/db', () => ({ db: jest.fn().mockResolvedValue({ results: [{ name: 'fromDB' }] }) }));

describe('Character redux', () => {
    describe('loadCharacter', () => {
        let store: MockStore;

        beforeEach(() => {
            jest.clearAllMocks();
            store = mockStore();
        });

        it('should invoke db util with correct arguments and dispatch correct actions and update store correctly', async () => {
            await store.dispatch(loadCharacter(30000));

            expect(db).toHaveBeenCalledTimes(1);
            expect(db).toHaveBeenCalledWith('characters/30000');
            expect(store.getActions()).toEqual([
                {
                    payload: { name: 'fromDB' },
                    type: 'character/LOADED',
                },
            ]);
            expect(runReducer(store, characterReducer)).toEqual({ name: 'fromDB' });
        });

        it('should not bother with fetching data if it already exists and dispatch correct actions and update store correctly', async () => {
            store = mockStore({ home: { results: [{ id: 666, name: 'exists' }] } });
            await store.dispatch(loadCharacter(666));

            expect(db).not.toHaveBeenCalled();
            expect(store.getActions()).toEqual([{ payload: { id: 666, name: 'exists' }, type: 'character/LOADED' }]);
            expect(runReducer(store, characterReducer)).toEqual({ id: 666, name: 'exists' });
        });

        it('should dispatch ERROR action and update store correctly if db throws', async () => {
            (db as jest.Mock).mockRejectedValueOnce('error');
            await store.dispatch(loadCharacter(118));

            expect(store.getActions()).toEqual([{ type: 'character/ERROR' }]);
            expect(runReducer(store, characterReducer)).toEqual({ error: true });
        });

        it('should clear store on CLEAR action', () => {
            store = mockStore({ character: { something: true } });
            store.dispatch({ type: CharacterActions.CLEARED });

            expect(runReducer(store, characterReducer)).toEqual({});
        });
    });
});
