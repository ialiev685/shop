import { type FastifyReply } from 'fastify';
import { type ProductService } from '../services/product-service';
import {
  type ProductSchema,
  type FastifyRequestTypeBox,
  type RemoveProductSchema,
  type UpdateProductSchema,
  type ProductListSchema,
} from './type';

export class ProductController {
  constructor(private productService: ProductService) {}

  public async addProduct(req: FastifyRequestTypeBox<ProductSchema>, res: FastifyReply) {
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

  public async getProductListByType(
    req: FastifyRequestTypeBox<ProductListSchema>,
    res: FastifyReply,
  ) {
    const product = await this.productService.getProductListByType(req.params.typeId, req.query);
    return res.status(200).send(product);
  }

  public async getAllProductList(
    req: FastifyRequestTypeBox<Omit<ProductListSchema, 'params'>>,
    res: FastifyReply,
  ) {
    const product = await this.productService.getAllProductList(req.query);
    return res.status(200).send(product);
  }
}
