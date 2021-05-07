import { Marked } from "https://jspm.dev/@ts-stack/markdown";

import { App, Controller, Get, View } from "https://deno.land/x/alosaur_lite/dist/mod.js";
import { getHtmlPage } from "./html-page.ts";

@Controller()
export class MainController {
  @Get()
  indexPage() {
    return View("index.md", {});
  }

  @Get("/page")
  defaultPage() {
    return View("page.md", {});
  }
}

const app = new App({
  controllers: [MainController],
});

app.useViewRender({
  type: "markdown",
  basePath: `/views/`,
  getBody: async (path: string, model: Object, config: any) => {
    return await getMarkDownPage(path);
  },
});

const globalRenderCache = new Map();

async function getMarkDownPage(path: string) {
  if (globalRenderCache.has(path)) {
    return globalRenderCache.get(path);
  }
  let result = null;

  let rootPath = import.meta.url;
  rootPath = rootPath.substring(0, rootPath.lastIndexOf("/") + 1);

  const request = new Request(rootPath + "views/" + path);
  const response = await fetch(request);

  if (response && response.status !== 404) {
    const text = await response.text();
    result = getHtmlPage(Marked.parse(text));
  }

  globalRenderCache.set(path, result);

  return result;
}

addEventListener("fetch", (event: FetchEvent) => {
  event.respondWith(app.handleRequest(event.request));
});
