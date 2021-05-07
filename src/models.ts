import { ControllerMetadataArgs } from "./metadata.ts";

export enum RequestMethod {
  Get = "GET",
  Post = "POST",
  Put = "PUT",
  Delete = "DELETE",
  Path = "PATCH",
  Options = "OPTIONS",
}

export interface ParamMetadataArgs {
  type: ParamType;
  target: Object;
  method: string;
  // Index in function
  index: number;
  name?: string;
}

export enum ParamType {
  Cookie = "cookie",
  Context = "context",
  Response = "response",
  Request = "request",
  Query = "query",
  RouteParam = "route-param",
  Body = "body",
}

export interface RouteMetadata {
  route: string;
  regexpRoute?: RegExp;
  actionObject: Object;
  controllerObject: Object;
  actionMetadata: ActionMetadataArgs;
  target: { [key: string]: any };
  action: string;
  method: string;
  params: ParamMetadataArgs[];
  routeParams?: { [key: string]: any };
}

export interface ActionMetadataArgs {
  /**
     * Type of request method, GET, POST, etc
     */
  type: RequestMethod;

  /**
     * Object of declaration
     */
  object: Object;

  /**
     * Object.constructor
     */
  target: Object;

  /**
     * Name of action controller method
     */
  method: string;

  /**
     * Route of action
     */
  route?: string | RegExp;

  /**
     * Event or pattern, uses for microservice
     */
  eventOrPattern?: string;

  /**
     * Parent Controller
     */
  controller?: ControllerMetadataArgs;
}

/**
 * Application settings
 */
export interface AppSettings {
  /**
     * Controllers declares in app layer
     */
  controllers?: Function[];
}

export class HttpContext {
  readonly request: Request;
  readonly response?: Response;

  constructor(request: Request) {
    this.request = request;
  }
}

export interface RouteParam {
  i: number;
  el: string;
}

export interface StaticFilesConfig {
  // local files
  root: string;
  // index file
  index?: string;
  baseRoute?: string;
}

export interface ViewRenderConfig {
  type: string;
  basePath: string;
  getBody: (path: string, model: Object, config: ViewRenderConfig) => any;
}
