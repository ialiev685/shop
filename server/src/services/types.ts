export interface GetProductListOptions {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}

export type GetProductInfoListOptions = Omit<GetProductListOptions, 'sortBy' | 'sortOrder'>;
