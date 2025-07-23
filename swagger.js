const swaggerAutogen = require('swagger-autogen');

const doc = {
    info: {
        title: 'User API',
        description: 'User API'
    },
    host: 'localhost:3000',
    schemes: ['http', 'https']
};

const outputFile = './swagger.json';
const endpointsFile = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFile, doc);