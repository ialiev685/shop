import fp from 'fastify-plugin';
import { sequelize } from '../database/sequelize-db';
import {
  BasketModel,
  BasketProductModel,
  ProductInfoModel,
  ProductModel,
  TypeModel,
} from '../models';

export const sequelizeInit = fp(async (instance) => {
  try {
    await sequelize.authenticate();
    instance.log.info('база данных инициализирована');
    instance.decorate('db', {
      sequelize,
      Basket: BasketModel,
      BasketProduct: BasketProductModel,
      Type: TypeModel,
      Product: ProductModel,
      ProductInfo: ProductInfoModel,
    });
    instance.addHook('onClose', async () => {
      await sequelize.close();
    });
  } catch (error) {
    instance.log.error(error);
    throw error;
  }
});
