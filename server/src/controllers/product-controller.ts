import { type FastifyReply } from 'fastify';
import { type ProductService } from '../services/product-service';
import { type ProductBodySchema, type FastifyRequestTypeBox } from './type';

export class ProductController {
  constructor(private productService: ProductService) {}

  public async addProduct(req: FastifyRequestTypeBox<ProductBodySchema>, res: FastifyReply) {
    const product = await this.productService.addProduct(req.body);
    return res.status(201).send(product);
  }
}
