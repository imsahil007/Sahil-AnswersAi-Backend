const swaggerJSDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'AI QA Service API',
            version: '1.0.0',
            description: 'API documentation for the AI QA Service',
        },
        servers: [
            {
                url: 'http://localhost:3000/api',
                description: 'Local server',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ['./routes/*.js', './models/*.js'], // Paths to files containing OpenAPI definitions
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
