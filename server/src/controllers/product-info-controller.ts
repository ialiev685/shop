import { type FastifyReply } from 'fastify';
import { type ProductInfoService } from '../services/product-info-service';
import {
  type RemoveProductInfoSchema,
  type UpdateProductInfoSchema,
  type FastifyRequestTypeBox,
  type ProductInfoSchema,
  type ProductInfoListSchema,
  type AllProductInfoListRequest,
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
    await this.productInfoService.removeProductInfo(req.params.productInfoId);
    return res.status(200).send();
  }

  public async updateProductInfo(
    req: FastifyRequestTypeBox<UpdateProductInfoSchema>,
    res: FastifyReply,
  ) {
    const productInfo = await this.productInfoService.updateProductInfo({
      productInfoId: req.params.productInfoId,
      ...req.body,
    });
    return res.status(200).send(productInfo);
  }

  public async getProductInfoListById(
    req: FastifyRequestTypeBox<ProductInfoListSchema>,
    res: FastifyReply,
  ) {
    const productInfos = await this.productInfoService.getProductInfoListById(req.params.productId);
    return res.status(200).send(productInfos);
  }

  public async getAllProductInfoList(req: AllProductInfoListRequest, res: FastifyReply) {
    const productInfos = await this.productInfoService.getAllProductInfoList(req.query);
    return res.status(200).send(productInfos);
  }
}
