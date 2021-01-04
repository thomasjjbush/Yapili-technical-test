import { AnyAction } from 'redux';

export const createAction = (type: string, payload?: unknown): AnyAction => ({ type, payload });
