import { type FastifyPluginCallback } from 'fastify';
import { ProductController } from '../../controllers/product-controller';
import { ProductService } from '../../services/product-service';
import { productSchema } from '../../schemas';

const productRoutes: FastifyPluginCallback = (instance) => {
  const productService = new ProductService(instance);
  const productController = new ProductController(productService);

  instance.post(
    '/addProduct',
    { schema: productSchema.productSchema },
    productController.addProduct.bind(productController),
  );
  instance.patch(
    '/updateProduct/:productId',
    { schema: productSchema.updateProductSchema },
    productController.updateProduct.bind(productController),
  );
  instance.delete(
    '/removeProduct/:productId',
    { schema: productSchema.removeProductSchema },
    productController.removeProduct.bind(productController),
  );
  instance.get(
    '/productList/:typeId',
    { schema: productSchema.getProductListSchema },
    productController.getProductList.bind(productController),
  );
};

export default productRoutes;
