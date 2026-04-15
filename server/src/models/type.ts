import {
  type InferAttributes,
  type InferCreationAttributes,
  type CreationOptional,
  DataTypes,
  Model,
} from 'sequelize';
import { sequelize } from '../database/sequelize-db';
class TypeModel extends Model<InferAttributes<TypeModel>, InferCreationAttributes<TypeModel>> {
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
      unique: true,
    },
  },
  {
    sequelize,
    tableName: 'type',
    timestamps: false,
  },
);

export default TypeModel;
