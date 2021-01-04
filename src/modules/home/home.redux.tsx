import { AnyAction } from 'redux';
import { Action, Home, HomeActions } from '../../../types';
import { createAction } from '../../utils/action/action';
import { db } from '../../utils/db/db';

const loadingResults = [...new Array(20)].map((_, i) => ({ id: i, name: '...' }));

export const loadCharacters = (multiplier: number): Action => async (dispatch, getState) => {
    const offset = multiplier * 20;
    if (getState().home.offset !== offset) dispatch(createAction(HomeActions.LOADING));

    try {
        const payload = await db('characters', { offset });
        dispatch(createAction(HomeActions.LOADED, payload));
    } catch (err) {
        dispatch(createAction(HomeActions.ERROR));
    }
};

export const homeReducer = (state = {}, { payload, type }: AnyAction): Home => {
    switch (type) {
        case HomeActions.ERROR:
            return { ...state, error: true };
        case HomeActions.LOADED:
            return { ...state, ...(payload as Home) };
        case HomeActions.LOADING:
            return { ...state, results: loadingResults };
        default:
            return state;
    }
};
