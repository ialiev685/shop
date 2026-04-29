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

import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  HeadersDefaults,
  ResponseType,
} from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams
  extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown>
  extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  JsonApi = "application/vnd.api+json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({
    securityWorker,
    secure,
    format,
    ...axiosConfig
  }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({
      ...axiosConfig,
      baseURL: axiosConfig.baseURL || "http://localhost:8000",
    });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(
    params1: AxiosRequestConfig,
    params2?: AxiosRequestConfig,
  ): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method &&
          this.instance.defaults.headers[
            method.toLowerCase() as keyof HeadersDefaults
          ]) ||
          {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] =
        property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(
          key,
          isFileType ? formItem : this.stringifyFormItem(formItem),
        );
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (
      type === ContentType.FormData &&
      body &&
      body !== null &&
      typeof body === "object"
    ) {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (
      type === ContentType.Text &&
      body &&
      body !== null &&
      typeof body !== "string"
    ) {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title Shop API
 * @version 1.0.0
 * @baseUrl http://localhost:8000
 *
 * API для интернет-магазина
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  auth = {
    /**
     * No description
     *
     * @tags Авторизация
     * @name RegisterCreate
     * @summary Авторизация пользователя
     * @request POST:/auth/register
     * @secure
     */
    registerCreate: (
      data: {
        /** @format email */
        email: string;
        /** @minLength 8 */
        password: string;
        /** @format uri */
        redirectUrl: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /** @format email */
          email: string;
          id: number;
          /** @default false */
          isActivate: boolean;
          role: string;
          accessToken?: string;
        },
        {
          message: string;
          errors?: any[];
        }
      >({
        path: `/auth/register`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Авторизация
     * @name ActivateDetail
     * @summary Активация аккаунта
     * @request GET:/auth/activate/{uuid}
     * @secure
     */
    activateDetail: (
      uuid: string,
      query?: {
        /** @format uri */
        redirectUrl?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        string,
        | string
        | {
            message: string;
            errors?: any[];
          }
      >({
        path: `/auth/activate/${uuid}`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Авторизация
     * @name LoginCreate
     * @summary Авторизация пользователя
     * @request POST:/auth/login
     * @secure
     */
    loginCreate: (
      data: {
        /** @format email */
        email: string;
        /** @minLength 8 */
        password: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /** @format email */
          email: string;
          id: number;
          /** @default false */
          isActivate: boolean;
          role: string;
          accessToken?: string;
        },
        {
          message: string;
          errors?: any[];
        }
      >({
        path: `/auth/login`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Восстановление пароля
     * @name ForgotPasswordCreate
     * @summary Отправка письма для сброса пароля
     * @request POST:/auth/forgotPassword
     * @secure
     */
    forgotPasswordCreate: (
      data: {
        /** @format email */
        email: string;
        /** @format uri */
        redirectUrl: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        void,
        {
          message: string;
          errors?: any[];
        }
      >({
        path: `/auth/forgotPassword`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Восстановление пароля
     * @name ResetPasswordCreate
     * @summary Сброс пароля
     * @request POST:/auth/resetPassword
     * @secure
     */
    resetPasswordCreate: (
      data: {
        /** @format uuid */
        uuid: string;
        /** @minLength 8 */
        password: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        void,
        {
          message: string;
          errors?: any[];
        }
      >({
        path: `/auth/resetPassword`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Авторизация
     * @name RefreshCreate
     * @summary Обновление токена
     * @request POST:/auth/refresh
     * @secure
     */
    refreshCreate: (params: RequestParams = {}) =>
      this.request<
        {
          /** @format email */
          email: string;
          id: number;
          /** @default false */
          isActivate: boolean;
          role: string;
          accessToken?: string;
        },
        {
          message: string;
          errors?: any[];
        }
      >({
        path: `/auth/refresh`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Пользователь
     * @name CurrentUserList
     * @summary Текущий пользователь
     * @request GET:/auth/currentUser
     * @secure
     */
    currentUserList: (params: RequestParams = {}) =>
      this.request<
        {
          /** @format email */
          email: string;
          id: number;
          /** @default false */
          isActivate: boolean;
          role: string;
          accessToken?: string;
        },
        {
          message: string;
          errors?: any[];
        }
      >({
        path: `/auth/currentUser`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  api = {
    /**
     * No description
     *
     * @tags basket
     * @name V1BasketListList
     * @summary Получить корзину пользователя
     * @request GET:/api/v1/basketList
     * @secure
     */
    v1BasketListList: (params: RequestParams = {}) =>
      this.request<
        {
          id: number;
          userId: number;
          basketProducts: {
            id: number;
            basketId: number;
            productId: number;
            quantity: number;
            product: {
              id: number;
              name: string;
              price: number;
              img: string;
              sku: string;
              rating: number;
            };
          }[];
        },
        {
          error?: string;
          message: string;
        }
      >({
        path: `/api/v1/basketList`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags basket
     * @name V1AddProductToBasketCreate
     * @summary Добавить продукт в корзину
     * @request POST:/api/v1/addProductToBasket
     * @secure
     */
    v1AddProductToBasketCreate: (
      data: {
        productId: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          id: number;
          basketId: number;
          productId: number;
          quantity: number;
          product: {
            id: number;
            name: string;
            price: number;
            img: string;
            sku: string;
            rating: number;
          };
        },
        {
          error?: string;
          message: string;
        }
      >({
        path: `/api/v1/addProductToBasket`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags basket
     * @name V1UpdateQuantityProductCreate
     * @summary Обновить количество продукта в корзине
     * @request POST:/api/v1/updateQuantityProduct
     * @secure
     */
    v1UpdateQuantityProductCreate: (
      data: {
        basketId: number;
        productId: number;
        /**
         * @min 1
         * @max 999
         */
        quantity: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          id: number;
          basketId: number;
          productId: number;
          quantity: number;
          product: {
            id: number;
            name: string;
            price: number;
            img: string;
            sku: string;
            rating: number;
          };
        },
        {
          error?: string;
          message: string;
        }
      >({
        path: `/api/v1/updateQuantityProduct`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags basket
     * @name V1RemoveProductFromBasketCreate
     * @summary Удалить продукт из корзины
     * @request POST:/api/v1/removeProductFromBasket
     * @secure
     */
    v1RemoveProductFromBasketCreate: (
      data: {
        basketId: number;
        productId: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        void,
        {
          error?: string;
          message: string;
        }
      >({
        path: `/api/v1/removeProductFromBasket`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags basket
     * @name V1ClearBasketCreate
     * @summary Очистить корзину
     * @request POST:/api/v1/clearBasket
     * @secure
     */
    v1ClearBasketCreate: (
      data: {
        basketId: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        void,
        {
          error?: string;
          message: string;
        }
      >({
        path: `/api/v1/clearBasket`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags product
     * @name V1AddProductCreate
     * @summary Добавить продукт
     * @request POST:/api/v1/addProduct
     * @secure
     */
    v1AddProductCreate: (
      data: {
        name: string;
        price: number;
        typeId: number;
        img: string;
        sku: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          id: number;
          name: string;
          price: number;
          rating: number;
          typeId: number;
          img: string;
          sku: string;
        },
        {
          error?: string;
          message: string;
        }
      >({
        path: `/api/v1/addProduct`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags product
     * @name V1UpdateProductPartialUpdate
     * @summary Обновить продукт
     * @request PATCH:/api/v1/updateProduct/{productId}
     * @secure
     */
    v1UpdateProductPartialUpdate: (
      productId: number,
      data: {
        name?: string;
        price?: number;
        typeId?: number;
        img?: string;
        sku?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          id: number;
          name: string;
          price: number;
          rating: number;
          typeId: number;
          img: string;
          sku: string;
        },
        {
          error?: string;
          message: string;
        }
      >({
        path: `/api/v1/updateProduct/${productId}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags product
     * @name V1RemoveProductDelete
     * @summary Удалить продукт
     * @request DELETE:/api/v1/removeProduct/{productId}
     * @secure
     */
    v1RemoveProductDelete: (productId: number, params: RequestParams = {}) =>
      this.request<
        void,
        {
          error?: string;
          message: string;
        }
      >({
        path: `/api/v1/removeProduct/${productId}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags product
     * @name V1ProductListDetail
     * @summary Получить список продуктов по типу
     * @request GET:/api/v1/productList/{typeId}
     * @secure
     */
    v1ProductListDetail: (typeId: number, params: RequestParams = {}) =>
      this.request<
        {
          id: number;
          name: string;
          price: number;
          rating: number;
          typeId: number;
          img: string;
          sku: string;
        }[],
        {
          error?: string;
          message: string;
        }
      >({
        path: `/api/v1/productList/${typeId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags productInfo
     * @name V1AddProductInfoCreate
     * @summary Добавить информацию о продукте
     * @request POST:/api/v1/addProductInfo
     * @secure
     */
    v1AddProductInfoCreate: (
      data: {
        name: string;
        description: string;
        productId: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          id: number;
          name: string;
          description: string;
          productId: number;
        },
        {
          error?: string;
          message: string;
        }
      >({
        path: `/api/v1/addProductInfo`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags productInfo
     * @name V1UpdateProductInfoPartialUpdate
     * @summary Обновить информацию о продукте
     * @request PATCH:/api/v1/updateProductInfo/{productInfoId}
     * @secure
     */
    v1UpdateProductInfoPartialUpdate: (
      productInfoId: number,
      data: {
        name?: string;
        description?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          id: number;
          name: string;
          description: string;
          productId: number;
        },
        {
          error?: string;
          message: string;
        }
      >({
        path: `/api/v1/updateProductInfo/${productInfoId}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags productInfo
     * @name V1RemoveProductInfoDelete
     * @summary Удалить информацию о продукте
     * @request DELETE:/api/v1/removeProductInfo/{productInfoId}
     * @secure
     */
    v1RemoveProductInfoDelete: (
      productInfoId: number,
      params: RequestParams = {},
    ) =>
      this.request<
        void,
        {
          error?: string;
          message: string;
        }
      >({
        path: `/api/v1/removeProductInfo/${productInfoId}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags productInfo
     * @name V1ProductInfoListDetail
     * @summary Получить информацию о продукте
     * @request GET:/api/v1/productInfoList/{productId}
     * @secure
     */
    v1ProductInfoListDetail: (productId: number, params: RequestParams = {}) =>
      this.request<
        {
          id: number;
          name: string;
          description: string;
          productId: number;
        }[],
        {
          error?: string;
          message: string;
        }
      >({
        path: `/api/v1/productInfoList/${productId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags type
     * @name V1AddNameTypeCreate
     * @summary Добавить тип
     * @request POST:/api/v1/addNameType
     * @secure
     */
    v1AddNameTypeCreate: (
      data: {
        name: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          id: number;
          name: string;
        },
        {
          error?: string;
          message: string;
        }
      >({
        path: `/api/v1/addNameType`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags type
     * @name V1UpdateTypePartialUpdate
     * @summary Обновить тип
     * @request PATCH:/api/v1/updateType/{typeId}
     * @secure
     */
    v1UpdateTypePartialUpdate: (
      typeId: number,
      data: {
        name: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          id: number;
          name: string;
        },
        {
          error?: string;
          message: string;
        }
      >({
        path: `/api/v1/updateType/${typeId}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags type
     * @name V1RemoveTypeDelete
     * @summary Удалить тип
     * @request DELETE:/api/v1/removeType/{typeId}
     * @secure
     */
    v1RemoveTypeDelete: (typeId: number, params: RequestParams = {}) =>
      this.request<
        void,
        {
          error?: string;
          message: string;
        }
      >({
        path: `/api/v1/removeType/${typeId}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags type
     * @name V1TypeListList
     * @summary Получить типы
     * @request GET:/api/v1/typeList
     * @secure
     */
    v1TypeListList: (params: RequestParams = {}) =>
      this.request<
        {
          id: number;
          name: string;
        },
        {
          error?: string;
          message: string;
        }
      >({
        path: `/api/v1/typeList`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
}
