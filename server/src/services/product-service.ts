import { type FastifyInstance } from 'fastify';
import { ApiError } from '../exception/api-errors';
import { type Static } from 'typebox';
import { type updateProductRequestSchema, type addProductRequestSchema } from '../schemas/product';
import { type GetProductListOptions } from './types';
import { createPaginatedResponse, extractUUIDFromUrl } from '../utils';
import { Op } from 'sequelize';
import { type UploadService } from './upload-service';

type ProductParams = Static<(typeof addProductRequestSchema)['body']>;
type updateProductParams = Static<(typeof updateProductRequestSchema)['body']> &
  Static<(typeof updateProductRequestSchema)['params']>;

export class ProductService {
  constructor(
    private fastifyInstance: FastifyInstance,
    private uploadService: UploadService,
  ) {}

  public async addProduct(params: ProductParams) {
    const existingProduct = await this.fastifyInstance.db.Product.findOne({
      where: { sku: params.sku },
    });
    if (existingProduct) {
      throw ApiError.BadRequestError(`Продукт со значением'${params.sku}' уже существует`);
    }
    const typeExists = await this.fastifyInstance.db.Type.findByPk(params.typeId);
    if (!typeExists) {
      throw ApiError.BadRequestError(`Тип продукта со значением '${params.typeId}' не существует`);
    }
    const product = await this.fastifyInstance.db.Product.create({
      name: params.name,
      price: params.price,
      typeId: params.typeId,
      img: params.img,
      sku: params.sku,
    });

    return product;
  }

  public async removeProduct(productId: number) {
    const product = await this.fastifyInstance.db.Product.findByPk(productId);
    if (!product) {
      throw ApiError.BadRequestError(`Продукт со значением '${productId}' не существует`);
    }
    const imageId = extractUUIDFromUrl(product.img);
    if (imageId) {
      await this.uploadService.remove(imageId);
    }
    await product.destroy();
  }

  public async updateProduct(params: updateProductParams) {
    const { productId, sku, ...otherParams } = params;

    const product = await this.fastifyInstance.db.Product.findByPk(productId);
    if (!product) {
      throw ApiError.BadRequestError(`Продукт со значением '${params.productId}' не существует`);
    }

    if (sku && sku !== product.sku) {
      const existing = await this.fastifyInstance.db.Product.findOne({
        where: { sku },
        attributes: ['id'],
      });
      if (existing) {
        throw ApiError.BadRequestError(`Продукт со значеним '${sku}' уже существует`);
      }
    }

    const updateData = sku ? { ...otherParams, sku } : otherParams;
    return await product.update(updateData);
  }

  public async getProductListByType(typeId: number, options: GetProductListOptions) {
    const { page = 1, limit = 10, search, sortBy = 'name', sortOrder = 'DESC' } = options;
    const offset = (page - 1) * limit;
    const { count, rows } = await this.fastifyInstance.db.Product.findAndCountAll({
      limit,
      offset,
      order: [[sortBy, sortOrder]],
      where: {
        typeId,
        ...(search && { name: { [Op.iLike]: `%${search}%` } }),
      },

      include: [
        {
          model: this.fastifyInstance.db.Type,
          as: 'type',
        },
      ],
    });
    return createPaginatedResponse({ data: rows, total: count, page, limit });
  }

  public async getAllProductList(options: GetProductListOptions) {
    const { page = 1, limit = 10, search, sortBy = 'name', sortOrder = 'DESC' } = options;

    const offset = (page - 1) * limit;
    const { count, rows } = await this.fastifyInstance.db.Product.findAndCountAll({
      limit,
      offset,
      order: [[sortBy, sortOrder]],
      where: search
        ? {
            name: { [Op.iLike]: `%${search}%` },
          }
        : {},
      include: [
        {
          model: this.fastifyInstance.db.Type,
          as: 'type',
        },
      ],
    });
    return createPaginatedResponse({ data: rows, total: count, page, limit });
  }

  public async getProductById(productId: number) {
    const product = await this.fastifyInstance.db.Product.findByPk(productId, {
      include: [
        {
          model: this.fastifyInstance.db.Type,
          as: 'type',
        },
      ],
    });

    if (!product) {
      throw ApiError.BadRequestError(`Продукт со значением '${productId}' не существует`);
    }
    return product;
  }
}
