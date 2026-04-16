import { type FastifyReply } from 'fastify';
import { type ProductInfoService } from '../services/product-info-service';
import {
  type RemoveProductInfoSchema,
  type UpdateProductInfoSchema,
  type FastifyRequestTypeBox,
  type ProductInfoSchema,
} from './type';

export class ProductInfoController {
  constructor(private productInfoService: ProductInfoService) {}

  public addProductInfo = async (
    req: FastifyRequestTypeBox<ProductInfoSchema>,
    reply: FastifyReply,
  ) => {
    const productInfo = await this.productInfoService.addProductInfo(req.body);

    return reply.status(201).send(productInfo);
  };

  public async removeProductInfo(
    req: FastifyRequestTypeBox<RemoveProductInfoSchema>,
    res: FastifyReply,
  ) {
    await this.productInfoService.removeProductInfo(req.body.productInfoId);
    return res.status(200).send();
  }

  public async updateProductInfo(
    req: FastifyRequestTypeBox<UpdateProductInfoSchema>,
    res: FastifyReply,
  ) {
    await this.productInfoService.updateProductInfo(req.body);
    return res.status(200).send();
  }
}
