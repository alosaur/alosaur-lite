export class ContentResponse extends Response {
  public __isContentResult__ = true;
}

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
