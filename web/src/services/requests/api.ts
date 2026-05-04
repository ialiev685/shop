import { api } from "../client";
import type {
  V1AddNameTypeCreatePayload,
  V1AddProductCreatePayload,
  V1ProductListDetailParams,
  V1RemoveProductDeleteParams,
  V1RemoveTypeDeleteParams,
} from "../data-contracts";

export const productList = async (params: V1ProductListDetailParams) => {
  const { data } = await api.v1ProductListDetail(params);
  return data;
};

export const addProduct = async (params: V1AddProductCreatePayload) => {
  const { data } = await api.v1AddProductCreate(params);
  return data;
};

export const removeProduct = async (params: V1RemoveProductDeleteParams) => {
  const { data } = await api.v1RemoveProductDelete(params);
  return data;
};

export const typeList = async () => {
  const { data } = await api.v1TypeListList();
  return data;
};

export const addType = async (params: V1AddNameTypeCreatePayload) => {
  const { data } = await api.v1AddNameTypeCreate(params);
  return data;
};

export const removeType = async (params: V1RemoveTypeDeleteParams) => {
  const { data } = await api.v1RemoveTypeDelete(params);
  return data;
};
