/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface Dimensions {
  width?: number;
  height?: number;
  depth?: number;
}

export interface Review {
  rating?: number;
  comment?: string;
  /** @format date-time */
  date?: string;
  reviewerName?: string;
  reviewerEmail?: string;
}

export interface Meta {
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  updatedAt?: string;
  barcode?: string;
  qrCode?: string;
}

export interface Product {
  id?: number;
  title?: string;
  description?: string;
  category?: string;
  price?: number;
  discountPercentage?: number;
  rating?: number;
  stock?: number;
  tags?: string[];
  brand?: string;
  sku?: string;
  weight?: number;
  dimensions?: Dimensions;
  warrantyInformation?: string;
  shippingInformation?: string;
  availabilityStatus?: string;
  reviews?: Review[];
  returnPolicy?: string;
  minimumOrderQuantity?: number;
  meta?: Meta;
  thumbnail?: string;
  images?: string[];
}

export interface ProductInput {
  title?: string;
  description?: string;
  category?: string;
  price?: number;
  discountPercentage?: number;
  rating?: number;
  stock?: number;
  tags?: string[];
  brand?: string;
  sku?: string;
  weight?: number;
  dimensions?: Dimensions;
  warrantyInformation?: string;
  shippingInformation?: string;
  availabilityStatus?: string;
  reviews?: Review[];
  returnPolicy?: string;
  minimumOrderQuantity?: number;
  meta?: Meta;
  thumbnail?: string;
  images?: string[];
}

export interface ProductsResponse {
  products?: Product[];
  /** Total number of products available */
  total?: number;
  /** Number of products skipped */
  skip?: number;
  /** Number of products returned */
  limit?: number;
}

export interface Category {
  slug?: string;
  name?: string;
  /** @format uri */
  url?: string;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown>
  extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  JsonApi = "application/vnd.api+json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "https://dummyjson.com";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) =>
    fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter(
      (key) => "undefined" !== typeof query[key],
    );
    return keys
      .map((key) =>
        Array.isArray(query[key])
          ? this.addArrayQueryParam(query, key)
          : this.addQueryParam(query, key),
      )
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.JsonApi]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.Text]: (input: any) =>
      input !== null && typeof input !== "string"
        ? JSON.stringify(input)
        : input,
    [ContentType.FormData]: (input: any) => {
      if (input instanceof FormData) {
        return input;
      }

      return Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        );
        return formData;
      }, new FormData());
    },
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(
    params1: RequestParams,
    params2?: RequestParams,
  ): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (
    cancelToken: CancelToken,
  ): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(
      `${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`,
      {
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData
            ? { "Content-Type": type }
            : {}),
        },
        signal:
          (cancelToken
            ? this.createAbortSignal(cancelToken)
            : requestParams.signal) || null,
        body:
          typeof body === "undefined" || body === null
            ? null
            : payloadFormatter(body),
      },
    ).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const responseToParse = responseFormat ? response.clone() : response;
      const data = !responseFormat
        ? r
        : await responseToParse[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title DummyJSON Products API
 * @version 1.0.0
 * @baseUrl https://dummyjson.com
 * @contact DummyJSON (https://dummyjson.com)
 *
 * Fake REST API for testing and prototyping e-commerce applications. Provides a comprehensive dataset of sample product information.
 */
export class ProductsApi<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  products = {
    /**
     * @description Returns a list of products. By default returns 30 items. Supports pagination, field selection, and sorting.
     *
     * @tags products
     * @name ProductsList
     * @summary Get all products
     * @request GET:/products
     */
    productsList: (
      query?: {
        /**
         * Number of products to return. Use 0 to get all items.
         * @default 30
         */
        limit?: number;
        /**
         * Number of products to skip (for pagination).
         * @default 0
         */
        skip?: number;
        /**
         * Comma-separated list of fields to include in the response.
         * @example "title,price"
         */
        select?: string;
        /**
         * Field name to sort by.
         * @example "title"
         */
        sortBy?: string;
        /**
         * Sort order.
         * @default "asc"
         */
        order?: "asc" | "desc";
      },
      params: RequestParams = {},
    ) =>
      this.request<ProductsResponse, any>({
        path: `/products`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Simulates adding a new product. Returns the created product with a new ID (not persisted on the server).
     *
     * @tags products
     * @name ProductsCreate
     * @summary Add a new product
     * @request POST:/products
     */
    productsCreate: (data: ProductInput, params: RequestParams = {}) =>
      this.request<Product, any>({
        path: `/products`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns detailed information about a specific product by its ID.
     *
     * @tags products
     * @name ProductsDetail
     * @summary Get a single product
     * @request GET:/products/{id}
     */
    productsDetail: (id: number, params: RequestParams = {}) =>
      this.request<Product, any>({
        path: `/products/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Simulates updating a product. Returns the updated product (not persisted on the server).
     *
     * @tags products
     * @name ProductsUpdate
     * @summary Update a product
     * @request PUT:/products/{id}
     */
    productsUpdate: (
      id: number,
      data: ProductInput,
      params: RequestParams = {},
    ) =>
      this.request<Product, any>({
        path: `/products/${id}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Simulates partially updating a product. Returns the updated product (not persisted on the server).
     *
     * @tags products
     * @name ProductsPartialUpdate
     * @summary Partially update a product
     * @request PATCH:/products/{id}
     */
    productsPartialUpdate: (
      id: number,
      data: ProductInput,
      params: RequestParams = {},
    ) =>
      this.request<Product, any>({
        path: `/products/${id}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Simulates deleting a product. Returns the deleted product with isDeleted and deletedOn fields.
     *
     * @tags products
     * @name ProductsDelete
     * @summary Delete a product
     * @request DELETE:/products/{id}
     */
    productsDelete: (id: number, params: RequestParams = {}) =>
      this.request<
        Product & {
          /** @example true */
          isDeleted?: boolean;
          /** @format date-time */
          deletedOn?: string;
        },
        any
      >({
        path: `/products/${id}`,
        method: "DELETE",
        format: "json",
        ...params,
      }),

    /**
     * @description Search for products by query string.
     *
     * @tags products
     * @name SearchList
     * @summary Search products
     * @request GET:/products/search
     */
    searchList: (
      query: {
        /**
         * Search query
         * @example "phone"
         */
        q: string;
        limit?: number;
        skip?: number;
        select?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ProductsResponse, any>({
        path: `/products/search`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns a list of all product categories with details.
     *
     * @tags categories
     * @name CategoriesList
     * @summary Get all product categories
     * @request GET:/products/categories
     */
    categoriesList: (params: RequestParams = {}) =>
      this.request<Category[], any>({
        path: `/products/categories`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Returns a simple list of all category slugs/names.
     *
     * @tags categories
     * @name CategoryListList
     * @summary Get product category list
     * @request GET:/products/category-list
     */
    categoryListList: (params: RequestParams = {}) =>
      this.request<string[], any>({
        path: `/products/category-list`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Returns all products belonging to a specific category.
     *
     * @tags categories
     * @name CategoryDetail
     * @summary Get products by category
     * @request GET:/products/category/{category}
     */
    categoryDetail: (category: string, params: RequestParams = {}) =>
      this.request<ProductsResponse, any>({
        path: `/products/category/${category}`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
}
