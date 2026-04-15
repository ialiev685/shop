import Type from 'typebox';

export const productSchemaBody = {
  body: Type.Object({
    name: Type.String(),
    price: Type.Number(),
    typeId: Type.Number(),
    img: Type.String(),
    sku: Type.String(),
  }),
};
