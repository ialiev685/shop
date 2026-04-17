import Type from 'typebox';

export const typeSchema = {
  body: Type.Object({
    name: Type.String(),
  }),
};

export const updateTypeSchema = {
  params: Type.Object({
    typeId: Type.Number(),
  }),
  body: Type.Object({
    name: Type.String(),
  }),
};

export const removeTypeSchema = {
  params: Type.Object({
    typeId: Type.Number(),
  }),
};
