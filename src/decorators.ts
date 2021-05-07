import { getMetadataArgsStorage } from "./metadata.ts";
import { ParamType, RequestMethod } from "./models.ts";

/**
 * Controller with route
 */
export function Controller(
  baseRoute?: string,
): Function {
  return function (object: any) {
    getMetadataArgsStorage().controllers.push({
      type: "default",
      object,
      target: object,
      route: baseRoute,
    });
  };
}

/**
 * Get action function
 */
export function Get(route?: string | RegExp) {
  return function (object: Object, methodName: string) {
    getMetadataArgsStorage().actions.push({
      type: RequestMethod.Get,
      object: object,
      target: object.constructor,
      method: methodName,
      route: route,
    });
  };
}

/**
 * Post action function
 */
export function Post(route?: string | RegExp): Function {
  return function (object: Object, methodName: string) {
    getMetadataArgsStorage().actions.push({
      type: RequestMethod.Post,
      object: object,
      target: object.constructor,
      method: methodName,
      route: route,
    });
  };
}

/**
 * Registers an action to be executed when POST request comes on a given route.
 * Must be applied on a controller action.
 */
export function Put(route?: string | RegExp): Function {
  return function (object: Object, methodName: string) {
    getMetadataArgsStorage().actions.push({
      type: RequestMethod.Put,
      object: object,
      target: object.constructor,
      method: methodName,
      route: route,
    });
  };
}

/**
 * Registers an action to be executed when PATCH request comes on a given route.
 * Must be applied on a controller action.
 */
export function Patch(route?: string | RegExp): Function {
  return function (object: Object, methodName: string) {
    getMetadataArgsStorage().actions.push({
      type: RequestMethod.Path,
      object: object,
      target: object.constructor,
      method: methodName,
      route: route,
    });
  };
}

/**
 * Registers an action to be executed when Delete request comes on a given route.
 * Must be applied on a controller action.
 */
export function Delete(route?: string | RegExp): Function {
  return function (object: Object, methodName: string) {
    getMetadataArgsStorage().actions.push({
      type: RequestMethod.Delete,
      object: object,
      target: object.constructor,
      method: methodName,
      route: route,
    });
  };
}

/**
 * Injects a context parameter value to the controller action parameter.
 * Must be applied on a controller action parameter.
 */
export function Ctx(): Function {
  return function (object: Object, methodName: string, index: number) {
    getMetadataArgsStorage().params.push({
      type: ParamType.Context,
      target: object.constructor,
      method: methodName,
      index: index,
    });
  };
}

/**
 * Injects a request's route parameter value to the controller action parameter.
 * Must be applied on a controller action parameter.
 */
export function Param(name: string): Function {
  return function (object: Object, methodName: string, index: number) {
    getMetadataArgsStorage().params.push({
      type: ParamType.RouteParam,
      target: object.constructor,
      method: methodName,
      index: index,
      name: name,
    });
  };
}

/**
 * Injects a request's query parameter value to the controller action parameter.
 * Must be applied on a controller action parameter.
 */
export function QueryParam(name: string): Function {
  return function (object: Object, methodName: string, index: number) {
    getMetadataArgsStorage().params.push({
      type: ParamType.Query,
      target: object.constructor,
      method: methodName,
      index: index,
      name: name,
    });
  };
}
