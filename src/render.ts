import { getViewRenderConfig } from "./mod.ts";
import { HttpContext } from "./models.ts";

export class ContentResponse extends Response {
  public __isContentResult__ = true;
}

/** Render JSON or other content such as strings, numbers, booleans */
export function Content(body: BodyInit, status: number = 200): ContentResponse {
  const headers = new Headers();

  let result = body;

  switch (typeof body) {
    case "object":
    case "boolean":
    case "number":
      headers.set("content-type", "application/json; charset=utf-8");
      result = JSON.stringify(body);
      break;

    default:
      headers.set("content-type", "text/html; charset=UTF-8");
      break;
  }

  const response = new ContentResponse(result, {
    status,
    headers,
  });

  return response;
}

/** Renders view with template with changed template render */
export async function View(
  path: string,
  model: Object,
  status: number = 200,
): Promise<ContentResponse> {
  const renderConfig = getViewRenderConfig();
  const result = await renderConfig.getBody(path, model, renderConfig);

  return result &&
    Content(await renderConfig.getBody(path, model, renderConfig), status);
}
