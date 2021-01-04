import React from 'react';
import ReactDOM from 'react-dom';
import { App } from '../app/app';

jest.mock('react-dom', () => ({ render: jest.fn() }));

describe('Entry point', () => {
    let spy: jest.SpyInstance;

    beforeEach(() => {
        jest.clearAllMocks();
        spy = jest.spyOn(document, 'getElementById').mockReturnValue(document.createElement('div'));
    });

    it('ReactDOM should be invoked with the correct arguments', async () => {
        await import('./');
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith('root');
        expect(ReactDOM.render).toHaveBeenCalledTimes(1);
        expect(ReactDOM.render).toHaveBeenCalledWith(<App />, document.createElement('div'));
    });
});
