import { type FastifyInstance } from 'fastify';
import { ForeignKeyConstraintError } from 'sequelize';
import { ApiError } from '../exception/api-errors';
import { type Static } from 'typebox';
import { type updateQuantityProductRequestSchema } from '../schemas/basket';

type BasketProduct = Static<(typeof updateQuantityProductRequestSchema)['body']> & {
  userId: number;
};
export class BasketService {
  constructor(private fastifyInstance: FastifyInstance) {}

  public async addProduct(userId: number, productId: number) {
    try {
      const [basket] = await this.fastifyInstance.db.Basket.findOrCreate({
        where: {
          userId,
        },
        defaults: {
          userId,
        },
      });

      const [basketProduct, created] = await this.fastifyInstance.db.BasketProduct.findOrCreate({
        where: {
          basketId: basket.id,
          productId: productId,
        },

        defaults: {
          basketId: basket.id,
          productId: productId,
          quantity: 1,
        },
        include: [
          {
            model: this.fastifyInstance.db.Product,
            as: 'product',
            required: false,
          },
        ],
      });

      if (!created) {
        basketProduct.quantity += 1;
        await basketProduct.save();
      }

      if (created) {
        await basketProduct.reload({
          include: [
            {
              model: this.fastifyInstance.db.Product,
              as: 'product',
              required: false,
            },
          ],
        });
      }

      return basketProduct;
    } catch (error) {
      if (error instanceof ForeignKeyConstraintError) {
        throw ApiError.BadRequestError(`Продукт со значением '${productId}' не существует`);
      }
      throw error;
    }
  }

  public async updateQuantityProduct({ quantity, basketId, productId, userId }: BasketProduct) {
    if (!Number.isInteger(quantity) || quantity < 1) {
      throw ApiError.BadRequestError('Количество не должно быть меньше 1');
    }

    const basket = await this.fastifyInstance.db.Basket.findOne({
      where: {
        id: basketId,
        userId: userId,
      },
    });

    if (!basket) {
      throw ApiError.BadRequestError('Корзина не найдена');
    }

    const basketProduct = await this.fastifyInstance.db.BasketProduct.findOne({
      where: { basketId: basket.id, productId },
      include: [
        {
          model: this.fastifyInstance.db.Product,
          as: 'product',
          required: false,
        },
      ],
    });

    if (!basketProduct) {
      throw ApiError.BadRequestError('Продукт не найден в корзине');
    }

    basketProduct.quantity = quantity;
    await basketProduct.save();

    return basketProduct;
  }

  public async removeProduct({ basketId, productId, userId }: Omit<BasketProduct, 'quantity'>) {
    const basketProduct = await this.fastifyInstance.db.BasketProduct.findOne({
      include: [
        {
          model: this.fastifyInstance.db.Basket,
          as: 'basket',
          where: { userId },
          required: true,
        },
      ],
      where: { productId, basketId },
    });
    if (!basketProduct) {
      throw ApiError.BadRequestError('Продукт не найден в корзине');
    }
    await basketProduct.destroy();
  }

  public async clearBasket({ basketId, userId }: Omit<BasketProduct, 'quantity' | 'productId'>) {
    const basket = await this.fastifyInstance.db.Basket.findOne({
      where: { id: basketId, userId },
    });

    if (!basket) {
      throw ApiError.BadRequestError('Корзина не найдена');
    }

    await this.fastifyInstance.db.BasketProduct.destroy({
      where: { basketId: basket.id },
    });
  }

  public async getProducts(userId: number) {
    const [basket] = await this.fastifyInstance.db.Basket.findOrCreate({
      where: {
        userId,
      },
      defaults: {
        userId,
      },
      include: [
        {
          model: this.fastifyInstance.db.BasketProduct,
          required: false,
          as: 'basketProducts',
          include: [
            {
              model: this.fastifyInstance.db.Product,
              as: 'product',
              attributes: ['id', 'name', 'price', 'img', 'sku', 'rating'],
            },
          ],
        },
      ],
    });

    await basket.reload({
      include: [
        {
          model: this.fastifyInstance.db.BasketProduct,
          required: false,
          as: 'basketProducts',
          include: [
            {
              model: this.fastifyInstance.db.Product,
              as: 'product',
              attributes: ['id', 'name', 'price', 'img', 'sku', 'rating'],
            },
          ],
        },
      ],
    });

    return basket;
  }
}
