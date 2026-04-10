import {
  type InferAttributes,
  type InferCreationAttributes,
  type CreationOptional,
  DataTypes,
  Model,
} from 'sequelize';
import { sequelize } from '../db';
export class BasketProductModel extends Model<
  InferAttributes<BasketProductModel>,
  InferCreationAttributes<BasketProductModel>
> {
  declare id: CreationOptional<number>;
  declare basketId: number;
  declare productId: number;
  declare count: CreationOptional<number>;
}

BasketProductModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    basketId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'basket_id',
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'product_id',
    },
    count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  },
  {
    sequelize,
    tableName: 'basket_products',
    timestamps: false,
  },
);
