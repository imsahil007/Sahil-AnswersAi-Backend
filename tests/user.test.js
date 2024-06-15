const request = require('supertest');
const {app, port} = require('../index');

const mongoose = require('mongoose');
const faker = require('faker');
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

    console.log('token', data.token, '=======================')

    return data.token;
}

afterAll(async () => {
    await mongoose.connection.close();
});

describe('User API', () => {
    it('should create a new user', async () => {
        const res = await request(app)
            .post('/api/users')
            .send({
                username: faker.internet.userName(),
                email: faker.internet.email(),
                password: faker.internet.password()
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('message', 'User created successfully');
    });

    it('should get user profile', async () => {
        const userId = '666d489ca3f409387c20ee53';
        const res = await request(app)
            .get(`/api/users/${userId}`)
            .set('Authorization', `Bearer ${await token()}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('username', 'testuser');
    });
});
