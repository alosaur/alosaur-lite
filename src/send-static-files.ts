import { StaticFilesConfig } from "./models.ts";
import { getParsedUrl } from "./utils/route.utils.ts";

export async function sendStaticFiles(
  request: Request,
  { root, index, baseRoute }: StaticFilesConfig,
): Promise<Response | null> {
  const urlParsed: URL = getParsedUrl(request.url);
  let url: string = urlParsed.pathname;

  if (baseRoute) {
    const regexpUrl = new RegExp(`^${baseRoute}`);

    if (regexpUrl.test(url)) {
      url = url.replace(regexpUrl, "");
    } else {
      return null;
    }
  }

  let response;

  try {
    // Fix for create right fileUrl
    if (url[0] === "/") url = url.replace("/", "");

    // create url with index
    const trailingSlash = url[url.length - 1] === "/";
    if (trailingSlash || url === "") {
      url += index;
    }

    let fileUrl = new URL(url, root).toString();

    response = await fetch(new Request(fileUrl, request));

    if (response.status === 404) {
      return null;
    }
  } catch (e) {
    return null;
  }

  return response;
}
