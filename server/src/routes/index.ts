import { type FastifyPluginCallback } from 'fastify';
import { authMiddleware } from '../middleware/auth-middleware';
import v1Routes from './v1';
import { guestMiddleware } from '../middleware/guest-middleware';

export const routes: FastifyPluginCallback = (instance, _, done) => {
  instance.addHook('preHandler', authMiddleware);
  instance.addHook('preHandler', guestMiddleware);
  instance.register(v1Routes, { prefix: '/v1' });
  done();
};
