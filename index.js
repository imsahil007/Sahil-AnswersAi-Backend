const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const logger = require('./config/logger');
const rateLimiter = require('./middlewares/rateLimiter');

const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const questionRoutes = require('./routes/questionRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Apply rate limiter to all requests
app.use(rateLimiter);

// Middleware to log requests
app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
});

// Swagger UI setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api', userRoutes);
app.use('/api', authRoutes);
app.use('/api', questionRoutes);

let PORT = process.env.PORT;

if(process.env.NODE_ENV === 'test') {
    PORT = process.env.TEST_PORT;
}
const server = app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
});
const port = server.address().port;
module.exports = {app, port};