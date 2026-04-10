import {
  type InferAttributes,
  type InferCreationAttributes,
  type CreationOptional,
  DataTypes,
  Model,
} from 'sequelize';
import { sequelize } from '../db';
export class ProductModel extends Model<
  InferAttributes<ProductModel>,
  InferCreationAttributes<ProductModel>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare price: number;
  declare rating: CreationOptional<number>;
  declare typeId: number;
  declare img: string;
}

ProductModel.init(
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
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    typeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'type_id',
    },
    img: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'ProductModels',
    timestamps: false,
  },
);
