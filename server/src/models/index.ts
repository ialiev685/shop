import BasketModel from './basket';
import BasketProductModel from './basket-product';
import ProductModel from './product';
import ProductInfoModel from './product-info';
import TypeModel from './type';

BasketModel.hasMany(BasketProductModel, {
  foreignKey: 'basketId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
  as: 'basketProducts',
});
BasketProductModel.belongsTo(BasketModel, { foreignKey: 'basketId', as: 'basket' });

ProductModel.hasOne(BasketProductModel, {
  foreignKey: 'productId',
  onDelete: 'CASCADE',
  as: 'basketProducts',
});
BasketProductModel.belongsTo(ProductModel, { as: 'product', foreignKey: 'productId' });

ProductModel.hasMany(ProductInfoModel, { foreignKey: 'productId', onDelete: 'CASCADE' });
ProductInfoModel.belongsTo(ProductModel, { foreignKey: 'productId', as: 'product' });

TypeModel.hasMany(ProductModel, { foreignKey: 'typeId', onDelete: 'RESTRICT' });
ProductModel.belongsTo(TypeModel, { foreignKey: 'typeId', as: 'type' });

export { BasketModel, BasketProductModel, ProductModel, ProductInfoModel, TypeModel };
