import { type FastifyInstance } from 'fastify';
import { ForeignKeyConstraintError, type Includeable } from 'sequelize';
import { ApiError } from '../exception/api-errors';
import {
  type RemoveProductOptions,
  type UpdateBasketProductOptions,
  type AddProductOptions,
  type BasketWithProducts,
} from './types';

export class BasketService {
  constructor(private fastifyInstance: FastifyInstance) {}

  public async addProduct({ userId, productId, sessionId }: AddProductOptions) {
    try {
      const basket = await this.getProducts(userId, sessionId);

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

  public async updateQuantityProduct({
    quantity,
    productId,
    userId,
    sessionId,
  }: UpdateBasketProductOptions) {
    if (!Number.isInteger(quantity) || quantity < 1) {
      throw ApiError.BadRequestError('Количество не должно быть меньше 1');
    }
    const basket = await this.getProducts(userId, sessionId);

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

  public async removeProduct({ basketId, productId, userId, sessionId }: RemoveProductOptions) {
    const basketProduct = await this.fastifyInstance.db.BasketProduct.findOne({
      where: { productId, basketId },
      include: [
        {
          model: this.fastifyInstance.db.Basket,
          as: 'basket',
          where: userId ? { userId } : { sessionId },
          required: true,
        },
      ],
    });
    if (!basketProduct) {
      throw ApiError.BadRequestError('Продукт не найден в корзине');
    }
    await basketProduct.destroy();
  }

  public async clearBasket(userId?: number, sessionId?: string) {
    const basket = await this.getProducts(userId, sessionId);

    if (!basket) {
      throw ApiError.BadRequestError('Корзина не найдена');
    }

    await this.fastifyInstance.db.BasketProduct.destroy({
      where: { basketId: basket.id },
    });
  }

  public async getProducts(userId?: number, sessionId?: string) {
    const include: Includeable[] = [
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
    ];

    if (userId && sessionId) {
      const transaction = await this.fastifyInstance.db.sequelize.transaction();
      try {
        const sessionBasket = (await this.fastifyInstance.db.Basket.findOne({
          where: { sessionId },
          include,
          transaction,
        })) as BasketWithProducts | null;

        const [userBasket] = await this.fastifyInstance.db.Basket.findOrCreate({
          where: { userId },
          defaults: { userId },
          include,
          transaction,
        });
        if (sessionBasket?.basketProducts?.length) {
          for (const sessionBasketProduct of sessionBasket.basketProducts) {
            await this.fastifyInstance.db.BasketProduct.upsert(
              {
                basketId: userBasket.id,
                productId: sessionBasketProduct.productId,
                quantity: sessionBasketProduct.quantity,
              },
              { transaction },
            );
          }

          await sessionBasket.destroy();
        }

        await userBasket.reload({ include });
        await transaction.commit();

        return userBasket;
      } catch (error) {
        await transaction.rollback();
        throw error;
      }
    }

    if (userId) {
      const [userBasket] = await this.fastifyInstance.db.Basket.findOrCreate({
        where: { userId },
        defaults: { userId },
        include,
      });
      await userBasket.reload({ include });
      return userBasket;
    }

    const finalSessionId = sessionId ?? '';
    const [sessionBasket] = await this.fastifyInstance.db.Basket.findOrCreate({
      where: { sessionId: finalSessionId },
      defaults: { sessionId: finalSessionId },
      include,
    });
    await sessionBasket.reload({ include });
    return sessionBasket;
  }
}
