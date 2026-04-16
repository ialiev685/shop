import { type FastifyReply } from 'fastify';
import { type ProductService } from '../services/product-service';
import {
  type ProductBodySchema,
  type FastifyRequestTypeBox,
  type RemoveProductSchema,
  type UpdateProductSchema,
} from './type';

export class ProductController {
  constructor(private productService: ProductService) {}

  public async addProduct(req: FastifyRequestTypeBox<ProductBodySchema>, res: FastifyReply) {
    const product = await this.productService.addProduct(req.body);
    return res.status(201).send(product);
  }

  public async removeProduct(req: FastifyRequestTypeBox<RemoveProductSchema>, res: FastifyReply) {
    await this.productService.removeProduct(req.params.productId);
    return res.status(200).send();
  }

  public async updateProduct(req: FastifyRequestTypeBox<UpdateProductSchema>, res: FastifyReply) {
    const product = await this.productService.updateProduct({
      productId: req.params.productId,
      ...req.body,
    });
    return res.status(200).send(product);
  }
}
