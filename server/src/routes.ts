import { authMiddleware } from './middleware/auth-middleware';
import { BasketController } from './controllers/basket-controller';
import { BasketService } from './services/basket-service';
import type { FastifyPluginCallback } from 'fastify';
import { TypeController } from './controllers/type-controller';
import { TypeService } from './services/type-service';
import { typeSchemaBody } from './schemas/type';
import { productSchemaBody } from './schemas/product';
import { ProductController } from './controllers/product-controller';
import { ProductService } from './services/product-service';

export const routes: FastifyPluginCallback = (instance) => {
  instance.addHook('preHandler', authMiddleware);
  const basketService = new BasketService(instance);
  const typeService = new TypeService(instance);
  const productService = new ProductService(instance);

  const basketController = new BasketController(basketService);
  const typeController = new TypeController(typeService);
  const productController = new ProductController(productService);

  instance.get('/basket', basketController.getProducts.bind(basketController));
  instance.post(
    '/addNameType',
    { schema: typeSchemaBody },
    typeController.addNameType.bind(typeController),
  );
  instance.post(
    '/addProduct',
    { schema: productSchemaBody },
    productController.addProduct.bind(productController),
  );
};
