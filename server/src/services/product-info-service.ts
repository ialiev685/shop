import { type FastifyInstance } from 'fastify';
import { Op, UniqueConstraintError } from 'sequelize';
import { ApiError } from '../exception/api-errors';
import { type Static } from 'typebox';

import {
  type productInfoRequestSchema,
  type updateProductInfoRequestSchema,
} from '../schemas/product-info';
import { type GetProductInfoListOptions } from './types';
import { createPaginatedResponse } from '../utils';

type ProductInfoParams = Static<(typeof productInfoRequestSchema)['body']>;
type updateProductInfoParams = Static<(typeof updateProductInfoRequestSchema)['params']> &
  Static<(typeof updateProductInfoRequestSchema)['body']>;

export class ProductInfoService {
  constructor(private fastifyInstance: FastifyInstance) {}

  public async addProductInfo(params: ProductInfoParams) {
    const product = await this.fastifyInstance.db.Product.findByPk(params.productId);

    if (!product) {
      throw ApiError.BadRequestError(`Продукт со значением '${params.productId}' не существует`);
    }

    try {
      const productInfo = await this.fastifyInstance.db.ProductInfo.create({
        name: params.name,
        description: params.description,
        productId: params.productId,
      });

      await productInfo.reload({
        include: [
          {
            model: this.fastifyInstance.db.Product,
            as: 'product',
            required: false,
          },
        ],
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
      throw ApiError.BadRequestError(
        `Характеристика со значением '${productInfoId}' не существует`,
      );
    }
    await product.destroy();
  }

  public async updateProductInfo(params: updateProductInfoParams) {
    const { productInfoId, ...otherParams } = params;
    const productInfo = await this.fastifyInstance.db.ProductInfo.findByPk(productInfoId);
    if (!productInfo) {
      throw ApiError.BadRequestError(
        `Характеристика со значением '${params.productInfoId}' не существует`,
      );
    }
    const updatedProductInfo = await productInfo.update(otherParams);
    return updatedProductInfo;
  }

  public async getProductInfoListById(productId: number) {
    const productInfos = await this.fastifyInstance.db.ProductInfo.findAll({
      where: { productId },
    });
    return productInfos;
  }

  public async getAllProductInfoList(options: GetProductInfoListOptions) {
    const { page = 1, limit = 10, search } = options;

    const offset = (page - 1) * limit;
    const { count, rows } = await this.fastifyInstance.db.ProductInfo.findAndCountAll({
      limit,
      offset,
      where: search
        ? {
            name: { [Op.iLike]: `%${search}%` },
          }
        : {},
      include: [
        {
          model: this.fastifyInstance.db.Product,
          as: 'product',
        },
      ],
    });

    return createPaginatedResponse({ data: rows, total: count, page, limit });
  }
}
