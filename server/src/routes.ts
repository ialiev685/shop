import fp from 'fastify-plugin';
import { authMiddleware } from './middleware/auth-middleware';

export const routes = fp((instance) => {
  instance.get('/', { preHandler: authMiddleware }, (_req, res) => {
    res.send('hello world');
  });
});
