import { type Migration } from '../migrator';
import { DataTypes } from 'sequelize';

export const up: Migration = async ({ context }) => {
  await context.addColumn('product', 'sku', {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  });
};

export const down: Migration = async ({ context }) => {
  await context.removeColumn('product', 'sku');
};
