import { type Migration } from '../migrator';

export const up: Migration = async ({ context }) => {
  await context.addConstraint('product_info', {
    fields: ['name', 'product_id'],
    type: 'unique',
    name: 'product_info_name_product_unique',
  });
};

export const down: Migration = async ({ context }) => {
  await context.removeConstraint('product_info', 'product_info_name_product_unique');
};
