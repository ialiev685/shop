import { type FastifyReply } from 'fastify';
import { type ProductInfoService } from '../services/product-info-service';
import { type FastifyRequestTypeBox, type ProductInfoBodySchema } from './type';

export class ProductInfoController {
  constructor(private productInfoService: ProductInfoService) {}

  public addProductInfo = async (
    req: FastifyRequestTypeBox<ProductInfoBodySchema>,
    reply: FastifyReply,
  ) => {
    const productInfo = await this.productInfoService.addProductInfo(req.body);

    return reply.status(201).send(productInfo);
  };
}
