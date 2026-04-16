import { type FastifyPluginCallback } from 'fastify';
import { BasketController } from '../../controllers/basket-controller';
import { BasketService } from '../../services/basket-service';
import { basketSchema } from '../../schemas';

const basketRoutes: FastifyPluginCallback = (instance) => {
  const basketService = new BasketService(instance);
  const basketController = new BasketController(basketService);

  instance.get('/basket', basketController.getProducts.bind(basketController));
  instance.post(
    '/addProductToBasket',
    { schema: basketSchema.addProductToBasketSchema },
    basketController.addProduct.bind(basketController),
  );
  instance.post(
    '/updateQuantityProduct',
    { schema: basketSchema.updateQuantityProductSchema },
    basketController.updateQuantityProduct.bind(basketController),
  );
  instance.post(
    '/removeProductFromBasket',
    { schema: basketSchema.removeProductFromBasketSchema },
    basketController.removeProduct.bind(basketController),
  );
  instance.post(
    '/clearBasket',
    { schema: basketSchema.clearBasketSchema },
    basketController.clearProduct.bind(basketController),
  );
};

export default basketRoutes;
