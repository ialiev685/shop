import { type FastifyInstance } from 'fastify';
import { ApiError } from '../exception/api-errors';
import { type Static } from 'typebox';
import { type updateProductRequestSchema, type productRequestSchema } from '../schemas/product';

type ProductParams = Static<(typeof productRequestSchema)['body']>;
type updateProductParams = Static<(typeof updateProductRequestSchema)['body']> &
  Static<(typeof updateProductRequestSchema)['params']>;

export class ProductService {
  constructor(private fastifyInstance: FastifyInstance) {}

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

  public async getProductListByType(typeId: number) {
    const productList = await this.fastifyInstance.db.Product.findAll({ where: { typeId } });
    return productList;
  }

  public async getAllProductList() {
    const productList = await this.fastifyInstance.db.Product.findAll();
    return productList;
  }
}
