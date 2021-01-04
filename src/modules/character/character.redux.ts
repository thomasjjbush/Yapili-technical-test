import { AnyAction } from 'redux';
import { createAction } from '../../utils/action/action';
import { db } from '../../utils/db/db';
import { Action, Character, CharacterActions } from '../../../types';

export const loadCharacter = (id: number): Action => async (dispatch, getState) => {
    try {
        dispatch(
            createAction(
                CharacterActions.LOADED,
                getState().home.results?.find((r) => r.id === id) ?? (await db(`characters/${id}`))?.results?.[0],
            ),
        );
    } catch (err) {
        dispatch(createAction(CharacterActions.ERROR));
    }
};

export const characterReducer = (state: Character = {}, { payload, type }: AnyAction): Character => {
    switch (type) {
        case CharacterActions.CLEARED:
            return {};
        case CharacterActions.ERROR:
            return { ...state, error: true };
        case CharacterActions.LOADED:
            return { ...state, ...payload };
        default:
            return state;
    }
};
