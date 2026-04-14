import { authMiddleware } from './middleware/auth-middleware';
import { BasketController } from './controllers/basket-controller';
import { BasketService } from './services/basket-service';
import type { FastifyPluginCallback } from 'fastify';

export const routes: FastifyPluginCallback = (instance) => {
  instance.addHook('preHandler', authMiddleware);
  const basketService = new BasketService(instance);
  const basketController = new BasketController(basketService);
  instance.get(
    '/basket',
    { preHandler: authMiddleware },
    basketController.getProducts.bind(basketController),
  );
};
