import Fastify from 'fastify';
import { routes } from './routes';
import { sequelizeInit } from './plugin/db-plugin';

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
});
app.register(sequelizeInit);
app.register(routes);
app.listen({ port: 8000 }, (error: unknown, address) => {
  console.log(`сервер запущено на ${address}`);
});
