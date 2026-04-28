import fp from 'fastify-plugin';
import swagger from '@fastify/swagger';
import { swaggerAggregator } from '../utils';

const PORT = Number(process.env.PORT) || 8000;
const AUTH_URL = process.env.AUTH_URL ?? '';

export const swaggerInit = fp(async (instance) => {
  const paths = await swaggerAggregator.loadMicroserviceSwagger(`${AUTH_URL}`, '/auth', '/api/v1');

  instance.register(swagger, {
    openapi: {
      openapi: '3.0.0',
      info: {
        title: 'Shop API',
        description: 'API для интернет-магазина',
        version: '1.0.0',
      },

      servers: [
        {
          url: `http://localhost:${PORT}`,
          description: 'Development server',
        },
      ],
      paths: paths ?? {},
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
            description: 'Введите JWT токен для авторизации',
          },
        },
      },

      security: [
        {
          bearerAuth: [],
        },
      ],
    },
  });
});
