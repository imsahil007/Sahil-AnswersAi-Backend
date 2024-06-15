const request = require('supertest');
const {app, port} = require('../index');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

beforeAll(async () => {
    await mongoose.connect("mongodb://localhost:27017/aiqaservice", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

});
const token = async function() {
    console.log(`http://localhost:${port}/api/auth/login`)
    const res = await fetch(`http://localhost:${port}/api/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: 'testuser@example.com',
            password: 'password123'
        })
    });

    const data = await res.json();

    return data.token;
}

afterAll(async () => {
    await mongoose.connection.close();
});
describe('Auth API', () => {
    it('should log in a user', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'testuser@example.com',
                password: 'password123'
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
    });

    it('should refresh a token', async () => {
       
        const res = await request(app)
            .post('/api/auth/refresh')
            .send({
                token: await token()
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
    });
});
