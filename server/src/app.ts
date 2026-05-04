import dotenv from 'dotenv';
import Fastify from 'fastify';
import { routes } from './routes';
import { sequelizeInit } from './plugin/db-plugin';
import proxy from '@fastify/http-proxy';
import cookie from '@fastify/cookie';
import { errorMiddleware } from './middleware/error-middleware';
import { type TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { ApiError } from './exception/api-errors';
import cors from '@fastify/cors';
import swaggerUi from '@fastify/swagger-ui';
import { swaggerInit } from './plugin/swagger-plugin';
import multipart from '@fastify/multipart';
import fastifyStatic from '@fastify/static';
import path from 'node:path';
import fs from 'node:fs/promises';

dotenv.config();
const PORT = Number(process.env.PORT) || 8000;
const NODE_ENV = process.env.NODE_ENV ?? 'development';

const app = Fastify({
  logger:
    NODE_ENV === 'development'
      ? {
          transport: {
            target: 'pino-pretty',
            options: {
              colorize: true,
              translateTime: 'HH:MM:ss Z',
              ignore: 'pid,hostname',
            },
          },
          level: 'debug',
        }
      : {
          level: 'info',
        },

  schemaErrorFormatter: (error) => {
    return ApiError.ValidationError(error.at(0)?.message);
  },
}).withTypeProvider<TypeBoxTypeProvider>();

app.register(fastifyStatic, {
  root: path.join(__dirname, '../', 'static'),
  prefix: '/static/',
});

app.register(cors, {
  origin: 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
});
app.register(cookie);
if (process.env.AUTH_URL) {
  app.register(proxy, {
    upstream: process.env.AUTH_URL,
    prefix: '/auth',
    rewritePrefix: '/api/v1',
  });
} else {
  app.log.warn('AUTH_URL не установлен, маршрут /auth закрыт');
}
app.register(multipart, { attachFieldsToBody: true, limits: { fileSize: 10 * 1024 * 1024 } });

if (NODE_ENV === 'development') {
  app.register(swaggerInit);
  app.register(swaggerUi, {
    routePrefix: '/swagger',
  });
}
app.get('/health', async () => {
  return { status: 'ok', timestamp: new Date().toISOString() };
});
app.register(routes, { prefix: '/api' });
app.setErrorHandler(errorMiddleware);

const start = async () => {
  await app.register(sequelizeInit);
  app.listen({ port: PORT, host: '0.0.0.0' }, (error, address) => {
    app.log.info(`Сервер запщуен ${address}`);
    if (error) {
      app.log.error(error);
      process.exit(1);
    }
  });
};
void start();
