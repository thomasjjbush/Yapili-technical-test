import thunk from 'redux-thunk';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { homeReducer } from '../modules/home/home.redux';
import { characterReducer } from '../modules/character/character.redux';

export const store = createStore(
    combineReducers({ character: characterReducer, home: homeReducer }),
    applyMiddleware(thunk),
);
