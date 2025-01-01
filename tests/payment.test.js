const request = require('supertest');
const app = require('../src/index'); // Ensure this exports the app correctly
const Payment = require('../src/models/payment.model');
const jwt = require('jsonwebtoken');
const seedDatabase = require('../src/database/seed');
const { generateToken } = require('../src/utils/auth');
const userModel = require('../src/models/user.model');

describe('Payment API Tests', () => {
    let token;

    beforeAll(async () => {
        // Seed the database and get the token for the admin user
        await seedDatabase();
        const user = await userModel.findOne({ username: 'admin' }).populate('roles');
        token = generateToken(user);
    }, 10000);

    afterEach(async () => {
        // Clean up the database after each test
        await Payment.deleteMany({});
    }, 10000);

    it('should return 401 if no token is provided', async () => {
        const response = await request(app)
            .post('/api/payments')
            .send({ userId: '123', amount: 100 });
        expect(response.statusCode).toBe(401);
    }, 10000);

    it('should return 400 if amount is missing', async () => {
        const response = await request(app)
            .post('/api/payments')
            .set('Authorization', `Bearer ${token}`)
            .send({});
        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBe('Missing amount');
    }, 10000);

    it('should process payment successfully', async () => {
        const response = await request(app)
            .post('/api/payments')
            .set('Authorization', `Bearer ${token}`)
            .send({ amount: 100 });
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('transactionId');
        expect(response.body.success).toBe(true);
    }, 10000);

    it('should handle payment failure', async () => {
        // Simulate a failure in the payment service
        jest.spyOn(Payment.prototype, 'save').mockImplementationOnce(() => {
            throw new Error('Payment gateway failed');
        });

        const response = await request(app)
            .post('/api/payments')
            .set('Authorization', `Bearer ${token}`)
            .send({ amount: 100 });
        expect(response.statusCode).toBe(500);
        expect(response.body.error).toBe('Internal Server Error');
    }, 10000);
});
