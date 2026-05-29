import { type FastifyPluginCallback } from 'fastify';
import { ProductController } from '../../controllers/product-controller';
import { ProductService } from '../../services/product-service';
import { productSchema } from '../../schemas';
import { UploadService } from '../../services/upload-service';
import { adminMiddleware } from '../../middleware/admin-middleware';

const productRoutes: FastifyPluginCallback = (instance) => {
  const uploadService = new UploadService();
  const productService = new ProductService(instance, uploadService);
  const productController = new ProductController(productService);

  instance.post(
    '/addProduct',
    { schema: productSchema.postProductSchema, preHandler: [adminMiddleware] },
    productController.addProduct.bind(productController),
  );
  instance.patch(
    '/updateProduct/:productId',
    { schema: productSchema.patchProductSchema, preHandler: [adminMiddleware] },
    productController.updateProduct.bind(productController),
  );
  instance.delete(
    '/removeProduct/:productId',
    { schema: productSchema.deleteProductSchema, preHandler: [adminMiddleware] },
    productController.removeProduct.bind(productController),
  );
  instance.get(
    '/productListByType/:typeId',
    { schema: productSchema.getProductByTypeSchema },
    productController.getProductListByType.bind(productController),
  );
  instance.get(
    '/allProductList',
    { schema: productSchema.getAllProductSchema },
    productController.getAllProductList.bind(productController),
  );
  instance.get(
    '/productById/:productId',
    { schema: productSchema.getProductByIdSchema },
    productController.getProductById.bind(productController),
  );
};

export default productRoutes;
