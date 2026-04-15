import { authMiddleware } from './middleware/auth-middleware';
import { BasketController } from './controllers/basket-controller';
import { BasketService } from './services/basket-service';
import type { FastifyPluginCallback } from 'fastify';
import { TypeController } from './controllers/type-controller';
import { TypeService } from './services/type-service';

import { ProductController } from './controllers/product-controller';
import { ProductService } from './services/product-service';
import { productSchemaBody, typeSchemaBody, productInfoSchemaBody, basketSchema } from './schemas';
import { ProductInfoController } from './controllers/product-info-controller';
import { ProductInfoService } from './services/product-info-service';

export const routes: FastifyPluginCallback = (instance) => {
  instance.addHook('preHandler', authMiddleware);
  const basketService = new BasketService(instance);
  const typeService = new TypeService(instance);
  const productService = new ProductService(instance);
  const productInfoService = new ProductInfoService(instance);

  const basketController = new BasketController(basketService);
  const typeController = new TypeController(typeService);
  const productController = new ProductController(productService);
  const productInfoController = new ProductInfoController(productInfoService);

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
  instance.post(
    '/addProductInfo',
    { schema: productInfoSchemaBody },
    productInfoController.addProductInfo.bind(productInfoController),
  );
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
    '/removeProduct',
    { schema: basketSchema.removeProductSchema },
    basketController.removeProduct.bind(basketController),
  );
};
