import { type FastifyPluginCallback } from 'fastify';
import { authMiddleware } from '../middleware/auth-middleware';
import v1Routes from './v1';

export const routes: FastifyPluginCallback = (instance, _, done) => {
  instance.addHook('preHandler', authMiddleware);
  instance.register(v1Routes, { prefix: '/v1' });
  instance.get('/health', async () => {
    return { status: 'ok', timestamp: new Date().toISOString() };
  });

  done();
};
