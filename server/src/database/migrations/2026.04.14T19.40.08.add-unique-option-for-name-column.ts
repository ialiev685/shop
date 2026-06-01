import { type Migration } from '../migrator';

export const up: Migration = async ({ context }) => {
  await context.addConstraint('type', {
    fields: ['name'],
    type: 'unique',
    name: 'type_name_unique',
  });
};

export const down: Migration = async ({ context }) => {
  await context.removeConstraint('type', 'type_name_unique');
};
