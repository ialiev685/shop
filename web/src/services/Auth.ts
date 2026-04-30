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
  ActivateDetailData,
  ActivateDetailParams,
  CurrentUserListData,
  ForgotPasswordCreateData,
  ForgotPasswordCreatePayload,
  LoginCreateData,
  LoginCreatePayload,
  RefreshCreateData,
  RegisterCreateData,
  RegisterCreatePayload,
  ResetPasswordCreateData,
  ResetPasswordCreatePayload,
} from "./data-contracts";
import { ContentType, HttpClient, type RequestParams } from "./http-client";

export class Auth<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Авторизация
   * @name RegisterCreate
   * @summary Авторизация пользователя
   * @request POST:/auth/register
   * @secure
   */
  registerCreate = (data: RegisterCreatePayload, params: RequestParams = {}) =>
    this.request<
      RegisterCreateData,
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
    });
  /**
   * No description
   *
   * @tags Авторизация
   * @name ActivateDetail
   * @summary Активация аккаунта
   * @request GET:/auth/activate/{uuid}
   * @secure
   */
  activateDetail = (
    { uuid, ...query }: ActivateDetailParams,
    params: RequestParams = {},
  ) =>
    this.request<
      ActivateDetailData,
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
    });
  /**
   * No description
   *
   * @tags Авторизация
   * @name LoginCreate
   * @summary Авторизация пользователя
   * @request POST:/auth/login
   * @secure
   */
  loginCreate = (data: LoginCreatePayload, params: RequestParams = {}) =>
    this.request<
      LoginCreateData,
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
    });
  /**
   * No description
   *
   * @tags Восстановление пароля
   * @name ForgotPasswordCreate
   * @summary Отправка письма для сброса пароля
   * @request POST:/auth/forgotPassword
   * @secure
   */
  forgotPasswordCreate = (
    data: ForgotPasswordCreatePayload,
    params: RequestParams = {},
  ) =>
    this.request<
      ForgotPasswordCreateData,
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
    });
  /**
   * No description
   *
   * @tags Восстановление пароля
   * @name ResetPasswordCreate
   * @summary Сброс пароля
   * @request POST:/auth/resetPassword
   * @secure
   */
  resetPasswordCreate = (
    data: ResetPasswordCreatePayload,
    params: RequestParams = {},
  ) =>
    this.request<
      ResetPasswordCreateData,
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
    });
  /**
   * No description
   *
   * @tags Авторизация
   * @name RefreshCreate
   * @summary Обновление токена
   * @request POST:/auth/refresh
   * @secure
   */
  refreshCreate = (params: RequestParams = {}) =>
    this.request<
      RefreshCreateData,
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
    });
  /**
   * No description
   *
   * @tags Пользователь
   * @name CurrentUserList
   * @summary Текущий пользователь
   * @request GET:/auth/currentUser
   * @secure
   */
  currentUserList = (params: RequestParams = {}) =>
    this.request<
      CurrentUserListData,
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
    });
}
