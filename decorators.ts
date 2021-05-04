import { getMetadataArgsStorage } from "./metadata.ts";
import { RequestMethod } from "./models.ts";

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
 * Gets controller
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
