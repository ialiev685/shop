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
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';

dotenv.config();
const PORT = Number(process.env.PORT) || 8000;
const HOST = process.env.HOST ?? '0.0.0.0';
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

app.register(cors, {
  origin: '*',
  credentials: true,
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

if (NODE_ENV === 'development') {
  app.register(swagger, {
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
    },
  });

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
  app.listen({ port: PORT, host: HOST }, (error, address) => {
    app.log.info(`Сервер запщуен ${address}`);
    if (error) {
      app.log.error(error);
      process.exit(1);
    }
  });
};
void start();
