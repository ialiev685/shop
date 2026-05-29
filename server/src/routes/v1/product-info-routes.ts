import { type FastifyPluginCallback } from 'fastify';
import { ProductInfoController } from '../../controllers/product-info-controller';
import { ProductInfoService } from '../../services/product-info-service';
import { productInfoSchema } from '../../schemas';
import { adminMiddleware } from '../../middleware/admin-middleware';

const productInfoRoutes: FastifyPluginCallback = (instance) => {
  const productInfoService = new ProductInfoService(instance);
  const productInfoController = new ProductInfoController(productInfoService);

  instance.post(
    '/addProductInfo',
    { schema: productInfoSchema.postProductInfoSchema, preHandler: [adminMiddleware] },
    productInfoController.addProductInfo.bind(productInfoController),
  );
  instance.patch(
    '/updateProductInfo/:productInfoId',
    { schema: productInfoSchema.patchProductSchema, preHandler: [adminMiddleware] },
    productInfoController.updateProductInfo.bind(productInfoController),
  );
  instance.delete(
    '/removeProductInfo/:productInfoId',
    { schema: productInfoSchema.deleteProductSchema, preHandler: [adminMiddleware] },
    productInfoController.removeProductInfo.bind(productInfoController),
  );
  instance.get(
    '/productInfoListById/:productId',
    { schema: productInfoSchema.getProductInfoListByIdSchema },
    productInfoController.getProductInfoListById.bind(productInfoController),
  );
  instance.get(
    '/allProductInfoList',
    { schema: productInfoSchema.getAllProductInfoListSchema },
    productInfoController.getAllProductInfoList.bind(productInfoController),
  );
};

export default productInfoRoutes;
