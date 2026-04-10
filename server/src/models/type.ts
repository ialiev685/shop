import {
  type InferAttributes,
  type InferCreationAttributes,
  type CreationOptional,
  DataTypes,
  Model,
} from 'sequelize';
import { sequelize } from '../db';
export class TypeModel extends Model<
  InferAttributes<TypeModel>,
  InferCreationAttributes<TypeModel>
> {
  declare id: CreationOptional<number>;
  declare name: string;
}

TypeModel.init(
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
  },
  {
    sequelize,
    tableName: 'types',
    timestamps: false,
  },
);
