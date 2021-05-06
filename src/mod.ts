import { AppSettings, HttpContext, RouteMetadata } from "./models.ts";
import {
  getMetadataArgsStorage,
  MetadataArgsStorage,
  ObjectKeyAny,
} from "./metadata.ts";
import { getAction } from "./utils/get-action.ts";
import { getActionParams } from "./utils/get-action-params.ts";
import {Content, ContentResponse} from "./render.ts";

export class App {
  private _routes: RouteMetadata[] = [];

  private readonly metadata: MetadataArgsStorage;
  private classes: ObjectKeyAny[] = [];

  constructor(private readonly settings: AppSettings) {
    this.metadata = getMetadataArgsStorage();

    registerControllers(
      this.metadata,
      this.classes,
      (route) => this._routes.push(route),
    );
  }

  public async handleRequest(request: Request): Promise<Response> {
    const context = new HttpContext(request);

    const action = getAction(
      this._routes,
      request.method,
      request.url,
    );

    if (action !== null) {
      // Get arguments in this action
      const args = await getActionParams(
        context,
        action,
      );

      // Get Action result from controller method
      const result: ContentResponse | Response | BodyInit  = await action.target[action.action](
        ...args,
      );

      if((result as ContentResponse).__isContentResult__ || result instanceof Response){
        return result as Response;
      } else {
        return Content(result as BodyInit);
      }
    }

    return Content("Not found", 404);
  }
}

/**
 * Registering controllers
 */
export function registerControllers<TState>(
  metadata: MetadataArgsStorage<TState>,
  classes: ObjectKeyAny[] = [],
  addToRoute: (route: RouteMetadata) => void,
) {
  // TODO: add two route Map (with route params / exact match)
  // example: new Map(); key = route, value = object

  metadata.controllers.forEach((controller) => {
    const actions = metadata.actions.filter((action) =>
      action.target === controller.target
    );
    const params = metadata.params.filter((param) =>
      param.target === controller.target
    );

    controller.actions = actions;

    const target = new controller.object();
    classes.push(target);

    actions.forEach((action) => {
      action.controller = controller;

      let fullRoute: string = "";

      if (controller.route) {
        fullRoute += controller.route;
      }

      const regexpRoute: RegExp | undefined = action.route instanceof RegExp
        ? action.route
        : undefined;

      if (!regexpRoute && action.route) {
        fullRoute += action.route;
      }

      if (fullRoute === "") {
        fullRoute = "/";
      }

      const metaRoute: RouteMetadata = {
        route: fullRoute,
        regexpRoute,
        target: target,
        actionObject: action.object,
        controllerObject: controller.target,
        actionMetadata: action,
        action: action.method,
        method: action.type,
        params: params.filter((param) => param.method === action.method),
      };

      addToRoute(metaRoute);
    });
  });
}
