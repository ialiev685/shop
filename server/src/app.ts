import dotenv from 'dotenv';
import Fastify from 'fastify';
import { routes } from './routes';
import { sequelizeInit } from './plugin/db-plugin';

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
});
app.register(sequelizeInit);
app.register(routes);
app.listen({ port: Number(PORT) }, (error, address) => {
  if (error) {
    app.log.error(error);
    process.exit(1);
  }
  console.log(`Сервер запщуен ${address}`);
});
