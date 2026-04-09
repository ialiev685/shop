import Fastify from 'fastify';
import { routes } from './routes';

const app = Fastify({ logger:
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
        level: 'info', // в проде - чистый JSON
      } });

app.register(routes);
app.listen({ port: 8000 }, (error, address) => {
  console.log(`сервер запущено на ${address}`);
});
