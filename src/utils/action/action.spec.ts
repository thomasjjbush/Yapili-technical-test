import { createAction } from './action';

describe('createAction', () => {
    it('should return correct object based on provided arguments', () => {
        expect(createAction('type', 'payload')).toEqual({ type: 'type', payload: 'payload' });
    });
});
