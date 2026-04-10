import {
  type InferAttributes,
  type InferCreationAttributes,
  type CreationOptional,
  DataTypes,
  Model,
} from 'sequelize';
import { sequelize } from '../db';
export class BasketModel extends Model<
  InferAttributes<BasketModel>,
  InferCreationAttributes<BasketModel>
> {
  declare id: CreationOptional<number>;
  declare userId: number | null;
  declare sessionId: string | null;
}

BasketModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'user_id',
    },
    sessionId: {
      type: DataTypes.UUID,
      allowNull: true,
      field: 'session_id',
    },
  },
  {
    sequelize,
    tableName: 'BasketModels',
    timestamps: false,
  },
);
