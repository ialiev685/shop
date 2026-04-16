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

export const removeProductSchemaBody = {
  body: Type.Object({
    productId: Type.Number(),
  }),
};

export const updateProductSchemaBody = {
  body: Type.Object({
    productId: Type.Number(),
    name: Type.Optional(Type.String()),
    price: Type.Optional(Type.Number()),
    typeId: Type.Optional(Type.Number()),
    img: Type.Optional(Type.String()),
    sku: Type.Optional(Type.String()),
  }),
};
