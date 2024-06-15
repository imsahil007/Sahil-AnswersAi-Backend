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
};
afterAll(async () => {
    await mongoose.connection.close();
});
describe('Question API', () => {
    it('should create a new question', async () => {
        const res = await request(app)
            .post('/api/questions')
            .set('Authorization', `Bearer ${await token()}`)
            .send({
                question: 'What is the capital of France?'
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('answer');
    });

    it('should get question by ID', async () => {
        const questionId = '666d4fda760ab70cf2915e41';
        const res = await request(app)
            .get(`/api/questions/${questionId}`)
            .set('Authorization', `Bearer ${await token()}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('question', 'What is the capital of France?');
    });
});
