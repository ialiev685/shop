import dotenv from 'dotenv';
import Fastify from 'fastify';
import { routes } from './routes';
import { sequelizeInit } from './plugin/db-plugin';
import proxy from '@fastify/http-proxy';
import cookie from '@fastify/cookie';
import { errorMiddleware } from './middleware/error-middleware';
import { type TypeBoxTypeProvider } from '@fastify/type-provider-typebox';

dotenv.config();
const PORT = process.env.PORT ?? 8000;

const app = Fastify({
  logger:
    process.env.NODE_ENV === 'development'
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
}).withTypeProvider<TypeBoxTypeProvider>();

app.register(cookie);
app.register(proxy, {
  upstream: process.env.AUTH_URL ?? '',
  prefix: '/auth',
  rewritePrefix: '/api/v1',
});
app.register(sequelizeInit);
app.register(routes, { prefix: '/api' });
app.setErrorHandler(errorMiddleware);
app.listen({ port: Number(PORT) }, (error, address) => {
  if (error) {
    app.log.error(error);
    process.exit(1);
  }
  console.log(`Сервер запщуен ${address}`);
});
