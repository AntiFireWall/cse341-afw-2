const swaggerAutogen = require('swagger-autogen');

const doc = {
    info: {
        title: 'Book API',
        description: 'Book API'
    },
    host: 'cse341-afw-2.onrender.com',
    // host: 'localhost:3000',
    schemes: [
        'https', 
        // 'http'
    ]
};

const outputFile = './swagger.json';
const endpointsFile = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFile, doc);