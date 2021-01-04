import { db } from './db';

global.fetch = jest.fn().mockResolvedValue({ json: jest.fn().mockResolvedValue({ data: 'result' }) });

describe('db', () => {
    it('fetch should be invoked with correct arguments and return expected data', async () => {
        expect(await db('endpoint', { limit: 20 })).toBe('result');
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith('http://mock-domain/endpoint?apikey=mock-pub-key&limit=20');
    });
});
