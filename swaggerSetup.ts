import swaggerAutogen from 'swagger-autogen';
import path from 'path';

const outputFile = path.join(__dirname, 'swagger.json');
const endpointsFiles = [path.join(__dirname, 'src', 'routes', 'apiRoutes.ts')];

async function generateSwagger() {
    try {
        await swaggerAutogen(outputFile, endpointsFiles);
        console.log('Swagger JSON generated!');
    } catch (err) {
        console.error('Error generating Swagger JSON:', err);
    }
}

generateSwagger();
