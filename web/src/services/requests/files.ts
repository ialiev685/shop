import { api } from "../client";
import type { V1UploadFileCreatePayload } from "../data-contracts";

export const uploadFile = async (params: V1UploadFileCreatePayload) => {
  const { data } = await api.v1UploadFileCreate(params);
  return data;
};
