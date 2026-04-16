import Type from 'typebox';

export const productSchema = {
  body: Type.Object({
    name: Type.String(),
    price: Type.Number(),
    typeId: Type.Number(),
    img: Type.String(),
    sku: Type.String(),
  }),
};

export const removeProductSchema = {
  body: Type.Object({
    productId: Type.Number(),
  }),
};

export const updateProductSchema = {
  body: Type.Object({
    productId: Type.Number(),
    name: Type.Optional(Type.String()),
    price: Type.Optional(Type.Number()),
    typeId: Type.Optional(Type.Number()),
    img: Type.Optional(Type.String()),
    sku: Type.Optional(Type.String()),
  }),
};
