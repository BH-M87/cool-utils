declare module '*.css';
declare module '*.less';
declare module '*.png';
declare module '*.svg' {
  export function ReactComponent(props: React.SVGProps<SVGSVGElement>): React.ReactElement;
  const url: string;
  export default url;
}
declare module 'axios' {
  export interface AxiosTransformer {
    (data: any, headers?: any): any;
  }

  export interface AxiosAdapter {
    (config: AxiosRequestConfig): AxiosPromise<any>;
  }

  export interface AxiosBasicCredentials {
    username: string;
    password: string;
  }

  export interface AxiosProxyConfig {
    host: string;
    port: number;
    auth?: {
      username: string;
      password: string;
    };
    protocol?: string;
  }

  export type Method =
    | 'get'
    | 'GET'
    | 'delete'
    | 'DELETE'
    | 'head'
    | 'HEAD'
    | 'options'
    | 'OPTIONS'
    | 'post'
    | 'POST'
    | 'put'
    | 'PUT'
    | 'patch'
    | 'PATCH'
    | 'form'
    | 'FORM'
    | 'link'
    | 'LINK'
    | 'unlink'
    | 'UNLINK';

  export type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream';

  export interface XsrfConfig {
    url?: string;
    xsrfHeaderName?: string;
    getToken?: (token: any) => string;
    timeout?: number;
  }
  export interface ThrowError {
    get?: Boolean;
    post?: Boolean;
    delete?: Boolean;
    head?: Boolean;
    options?: Boolean;
    patch?: Boolean;
    put?: Boolean;
    form?: Boolean;
    link?: Boolean;
    unlink?: Boolean;
    GET?: Boolean;
    POST?: Boolean;
    DELETE?: Boolean;
    HEAD?: Boolean;
    OPTIONS?: Boolean;
    PATCH?: Boolean;
    PUT?: Boolean;
    FORM?: Boolean;
    LINK?: Boolean;
    UNLINK?: Boolean;
  }
  export interface Options extends AxiosRequestConfig {
    notLoginInUrl?: string;
    notLoginErrorCode?: number | RegExp;
    correctErrorCode?: number | RegExp;
    loginPage?: string;
    parseResponse(data: any): any;
    statusMessage?: AnyObject;
    errorHook?: (error?: Error, url?: string) => void;
    isXsrfOn?: Boolean;
    xsrfToken?: string;
    xsrfConfig?: XsrfConfig;
    throwError?: ThrowError | false;
  }
  export interface AxiosRequestConfig {
    url?: string;
    options?: Options;
    method?: Method;
    baseURL?: string;
    transformRequest?: AxiosTransformer | AxiosTransformer[];
    transformResponse?: AxiosTransformer | AxiosTransformer[];
    headers?: any;
    params?: any;
    paramsSerializer?: (params: any) => string;
    data?: any;
    timeout?: number;
    timeoutErrorMessage?: string;
    withCredentials?: boolean;
    adapter?: AxiosAdapter;
    auth?: AxiosBasicCredentials;
    responseType?: ResponseType;
    xsrfCookieName?: string;
    xsrfHeaderName?: string;
    xsrfToken?: string;
    onUploadProgress?: (progressEvent: any) => void;
    onDownloadProgress?: (progressEvent: any) => void;
    maxContentLength?: number;
    validateStatus?: (status: number) => boolean;
    maxRedirects?: number;
    socketPath?: string | null;
    httpAgent?: any;
    httpsAgent?: any;
    proxy?: AxiosProxyConfig | false;
    cancelToken?: CancelToken;
  }

  export interface AxiosResponse<T = any> {
    data: T;
    status: number;
    statusText: string;
    headers: any;
    config: AxiosRequestConfig;
    request?: any;
  }

  export interface AxiosError<T = any> extends Error {
    config: AxiosRequestConfig;
    code?: string;
    request?: any;
    response?: AxiosResponse<T>;
    isAxiosError: boolean;
    toJSON: () => object;
  }

  export interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>> {}

  export interface CancelStatic {
    new (message?: string): Cancel;
  }

  export interface Cancel {
    message: string;
  }

  export interface Canceler {
    (message?: string): void;
  }

  export interface CancelTokenStatic {
    new (executor: (cancel: Canceler) => void): CancelToken;
    source(): CancelTokenSource;
  }

  export interface CancelToken {
    promise: Promise<Cancel>;
    reason?: Cancel;
    throwIfRequested(): void;
  }

  export interface CancelTokenSource {
    token: CancelToken;
    cancel: Canceler;
  }

  export interface AxiosInterceptorManager<V> {
    use(onFulfilled?: (value: V) => V | Promise<V>, onRejected?: (error: any) => any): number;
    eject(id: number): void;
  }

  export interface AxiosInstance {
    (config: AxiosRequestConfig): AxiosPromise;
    (url: string, config?: AxiosRequestConfig): AxiosPromise;
    defaults: AxiosRequestConfig;
    interceptors: {
      request: AxiosInterceptorManager<AxiosRequestConfig>;
      response: AxiosInterceptorManager<AxiosResponse>;
    };
    getUri(config?: AxiosRequestConfig): string;
    request<T = any, R = AxiosResponse<T>>(config: AxiosRequestConfig): Promise<R>;
    get<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R>;
    delete<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R>;
    head<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R>;
    options<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R>;
    post<T = any, R = AxiosResponse<T>>(
      url: string,
      data?: any,
      config?: AxiosRequestConfig,
    ): Promise<R>;
    form<T = any, R = AxiosResponse<T>>(
      url: string,
      data?: any,
      config?: AxiosRequestConfig,
    ): Promise<R>;
    put<T = any, R = AxiosResponse<T>>(
      url: string,
      data?: any,
      config?: AxiosRequestConfig,
    ): Promise<R>;
    patch<T = any, R = AxiosResponse<T>>(
      url: string,
      data?: any,
      config?: AxiosRequestConfig,
    ): Promise<R>;
  }

  export interface AxiosStatic extends AxiosInstance {
    create(config?: AxiosRequestConfig): AxiosInstance;
    Cancel: CancelStatic;
    CancelToken: CancelTokenStatic;
    isCancel(value: any): boolean;
    all<T>(values: (T | Promise<T>)[]): Promise<T[]>;
    spread<T, R>(callback: (...args: T[]) => R): (array: T[]) => R;
    Axios: AxiosStatic;
  }

  const Axios: AxiosStatic;

  export default Axios;
}

interface AnyObject {
  [key: string]: any;
}

interface HTMLScriptElement {
  readyState: 'loaded' | 'complete' | undefined;
  onreadystatechange: Function;
}

interface Attributes {
  name: string;
  value: string;
}

interface ChildNode {
  attributes: Attributes[];
}

interface Error {
  status?: number;
  data?: Response;
}
interface BizError extends Error {
  errorCode?: number;
  errCode?: number;
}
