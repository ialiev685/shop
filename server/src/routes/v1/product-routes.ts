import { type FastifyPluginCallback } from 'fastify';
import { ProductController } from '../../controllers/product-controller';
import { ProductService } from '../../services/product-service';
import { productSchema } from '../../schemas';

const productRoutes: FastifyPluginCallback = (instance) => {
  const productService = new ProductService(instance);
  const productController = new ProductController(productService);

  instance.post(
    '/addProduct',
    { schema: productSchema.productSchemaBody },
    productController.addProduct.bind(productController),
  );
  instance.patch(
    '/updateProduct',
    { schema: productSchema.updateProductSchemaBody },
    productController.updateProduct.bind(productController),
  );
  instance.delete(
    '/removeProduct',
    { schema: productSchema.removeProductSchemaBody },
    productController.removeProduct.bind(productController),
  );
};

export default productRoutes;
