import { type FastifyPluginCallback } from 'fastify';
import { BasketController } from '../../controllers/basket-controller';
import { BasketService } from '../../services/basket-service';
import { basketSchema } from '../../schemas';

const basketRoutes: FastifyPluginCallback = (instance) => {
  const basketService = new BasketService(instance);
  const basketController = new BasketController(basketService);

  instance.get(
    '/basketList',
    { schema: basketSchema.getBasketSchema },
    basketController.getProducts.bind(basketController),
  );
  instance.post(
    '/addProductToBasket',
    { schema: basketSchema.postAddSchema },
    basketController.addProduct.bind(basketController),
  );
  instance.post(
    '/updateQuantityProduct',
    { schema: basketSchema.postUpdateSchema },
    basketController.updateQuantityProduct.bind(basketController),
  );
  instance.post(
    '/removeProductFromBasket',
    { schema: basketSchema.postRemoveSchema },
    basketController.removeProduct.bind(basketController),
  );
  instance.post(
    '/clearBasket',
    { schema: basketSchema.postClearSchema },
    basketController.clearProduct.bind(basketController),
  );
};

export default basketRoutes;
