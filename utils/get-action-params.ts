import { HttpContext, RouteMetadata } from "../models.ts";

type ArgumentValue = any;

/** Gets route action params */
export async function getActionParams(
  context: HttpContext,
  route: RouteMetadata,
): Promise<ArgumentValue[]> {
  if (route.params.length == 0) {
    return [];
  }

  const args: ArgumentValue[] = [];
  const params = route.params.sort((a, b) => a.index - b.index);

  // fill params to resolve
  for (let i = 0; i < params.length; i++) {
    const param = params[i];

    switch (param.type) {
      case "query":
        // const queryParams = getQueryParams(context.request.url);
        //
        // if (queryParams && param.name) {
        //   const paramsArgs = queryParams.get(param.name);
        //   args.push(paramsArgs ? paramsArgs : undefined);
        // } else {
        //   args.push(undefined);
        // }
        break;

      case "cookie":
        // if (param.name) {
      //   const cookies = getCookies(context.request.serverRequest) || {};
      //   args.push(cookies[param.name]);
      // } else {
      //   args.push(undefined);
      // }
      // break;
      case "body":
        // args.push(
        //   await getTransformedParam(
        //     context,
        //     {
        //       transform: param.transform,
        //       type: param.type,
        //       config: transformConfigMap,
        //     },
        //     param.bodyParseOptions,
        //   ),
        // );
        break;

      case "request":
        args.push(context.request);
        break;

      case "response":
        args.push(context.response);
        break;

      case "context":
        args.push(context);
        break;

      case "route-param":
        if (route.routeParams && param.name) {
          args.push(route.routeParams[param.name]);
        } else {
          args.push(undefined);
        }
        break;

      default:
        args.push(undefined);
        break;
    }
  }
  return args;
}

/** Gets URL query params */
export function getQueryParams(url: string): URLSearchParams | undefined {
  const params = url.split("?")[1];

  if (!params) return undefined;

  return new URLSearchParams(params);
}
