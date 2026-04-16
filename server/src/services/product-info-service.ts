import { type FastifyInstance } from 'fastify';
import { UniqueConstraintError } from 'sequelize';
import { ApiError } from '../exception/api-errors';
import { type Static } from 'typebox';

import {
  type productInfoSchemaBody,
  type updateProductInfoSchemaBody,
} from '../schemas/product-info';

type ProductInfoParams = Static<(typeof productInfoSchemaBody)['body']>;
type updateProductInfoParams = Static<(typeof updateProductInfoSchemaBody)['body']>;

export class ProductInfoService {
  constructor(private fastifyInstance: FastifyInstance) {}

  public async addProductInfo(params: ProductInfoParams) {
    const product = await this.fastifyInstance.db.Product.findByPk(params.productId);

    if (!product) {
      throw ApiError.BadRequestError(`Значение со значением '${params.productId}' не существует`);
    }

    try {
      const productInfo = await this.fastifyInstance.db.ProductInfo.create({
        name: params.name,
        description: params.description,
        productId: params.productId,
      });

      return productInfo;
    } catch (error) {
      if (error instanceof UniqueConstraintError) {
        const field = error.errors?.[0]?.path;
        throw ApiError.BadRequestError(`Значение поля '${field}' уже существует`);
      }
      throw error;
    }
  }

  public async removeProductInfo(productInfoId: number) {
    const product = await this.fastifyInstance.db.ProductInfo.findByPk(productInfoId);
    if (!product) {
      throw ApiError.BadRequestError(`Запись со значением '${productInfoId}' не существует`);
    }
    await product.destroy();
  }

  public async updateProductInfo(params: updateProductInfoParams) {
    const { productInfoId, ...otherParams } = params;
    const productInfo = await this.fastifyInstance.db.ProductInfo.findByPk(productInfoId);
    if (!productInfo) {
      throw ApiError.BadRequestError(`Запись со значением '${params.productInfoId}' не существует`);
    }
    const updatedProductInfo = await productInfo.update(otherParams);
    return updatedProductInfo;
  }
}
