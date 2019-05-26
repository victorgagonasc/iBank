import app from '../app';
import * as request from 'supertest';

describe('GET / - About endpoint', () => {
    it('Welcome API Request', async () => {
        const result = await request(app).get('/');
        expect(result.status).toEqual(200);
    });
});