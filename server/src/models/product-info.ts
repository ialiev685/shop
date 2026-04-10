import {
  type InferAttributes,
  type InferCreationAttributes,
  type CreationOptional,
  DataTypes,
  Model,
} from 'sequelize';
import { sequelize } from '../db';
export class ProductInfoModel extends Model<
  InferAttributes<ProductInfoModel>,
  InferCreationAttributes<ProductInfoModel>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare description: number;
  declare productId: number;
}

ProductInfoModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'product_id',
    },
  },
  {
    sequelize,
    tableName: 'product_infos',
    timestamps: false,
  },
);
