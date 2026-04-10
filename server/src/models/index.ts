import { BasketModel } from './basket';
import { BasketProductModel } from './basket-product';
import { ProductModel } from './product';
import { ProductInfoModel } from './product-info';
import { TypeModel } from './type';

BasketModel.hasMany(BasketProductModel, {
  foreignKey: 'basketId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
BasketProductModel.belongsTo(BasketModel, { foreignKey: 'basketId' });

ProductModel.hasOne(BasketProductModel, { foreignKey: 'productId', onDelete: 'CASCADE' });
BasketProductModel.belongsTo(ProductModel, { foreignKey: 'productId' });

ProductModel.hasMany(ProductInfoModel, { foreignKey: 'productId', onDelete: 'CASCADE' });
ProductInfoModel.belongsTo(ProductModel, { foreignKey: 'productId' });

TypeModel.hasMany(ProductModel, { foreignKey: 'typeId', onDelete: 'RESTRICT' });
ProductModel.belongsTo(TypeModel, { foreignKey: 'typeId' });

export { BasketModel, BasketProductModel, ProductModel, ProductInfoModel, TypeModel };
