import { type FastifyPluginCallback } from 'fastify';
import { ProductController } from '../../controllers/product-controller';
import { ProductService } from '../../services/product-service';
import { productSchema } from '../../schemas';

const productRoutes: FastifyPluginCallback = (instance) => {
  const productService = new ProductService(instance);
  const productController = new ProductController(productService);

  instance.post(
    '/addProduct',
    { schema: productSchema.postProductSchema },
    productController.addProduct.bind(productController),
  );
  instance.patch(
    '/updateProduct/:productId',
    { schema: productSchema.patchProductSchema },
    productController.updateProduct.bind(productController),
  );
  instance.delete(
    '/removeProduct/:productId',
    { schema: productSchema.deleteProductSchema },
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
};

export default productRoutes;
