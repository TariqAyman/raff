require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { connectDB } = require('./config/db');
const { initRedis } = require('./services/redis.service');
const rateLimit = require('./middlewares/rateLimit.middleware');
const authMiddleware = require('./middlewares/auth.middleware');
const routes = require('./routes/routes');
const authRoutes = require('./routes/auth.routes');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const yaml = require('js-yaml');
const app = express();

(async function startServer() {
    await connectDB();
    initRedis();

    app.use(bodyParser.json());

    // Load your OpenAPI file
    const swaggerFile = yaml.load(fs.readFileSync('./swagger.yaml', 'utf8'));

    // Serve Swagger UI on /api-docs
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

    // Global rate limit
    app.use(rateLimit());

    // auth routes
    app.use('/api', authRoutes);

    // Use JWT auth for all routes:
    app.use(authMiddleware);

    // Main routes
    app.use('/api', routes);

    // Error handling
    app.use((err, req, res, next) => {
        console.error('[Server Error]', err);
        res.status(500).json({ error: 'Internal Server Error' });
    });

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`[Server] Running on port ${PORT}`);
    });
})();

module.exports = app;
