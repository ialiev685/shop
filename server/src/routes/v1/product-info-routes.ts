import { type FastifyPluginCallback } from 'fastify';
import { ProductInfoController } from '../../controllers/product-info-controller';
import { ProductInfoService } from '../../services/product-info-service';
import { productInfoSchema } from '../../schemas';

const productInfoRoutes: FastifyPluginCallback = (instance) => {
  const productInfoService = new ProductInfoService(instance);
  const productInfoController = new ProductInfoController(productInfoService);

  instance.post(
    '/addProductInfo',
    { schema: productInfoSchema.productInfoSchema },
    productInfoController.addProductInfo.bind(productInfoController),
  );
  instance.patch(
    '/updateProductInfo/:productInfoId',
    { schema: productInfoSchema.updateProductInfoSchema },
    productInfoController.updateProductInfo.bind(productInfoController),
  );
  instance.delete(
    '/removeProductInfo/:productInfoId',
    { schema: productInfoSchema.removeProductInfoSchema },
    productInfoController.removeProductInfo.bind(productInfoController),
  );
  instance.get(
    '/productInfoList/:productId',
    { schema: productInfoSchema.getProductInfoListSchema },
    productInfoController.getProductInfoList.bind(productInfoController),
  );
};

export default productInfoRoutes;
