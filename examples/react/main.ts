import {App, View, Controller, Get } from "../../mod.ts";
import {getPage} from "./views/app.tsx";
// import { App, Content, Controller, Get, Param, QueryParam } from "../dist/mod.js";

@Controller() // or @Controller('specific-route')
export class MainController {
  @Get()
  indexPage() {
    return View("", {});
  }

  @Get("/contacts")
  contactsPage() {
    return View("contacts", {});
  }
}

const app = new App({
  controllers: [MainController],
});

app.useViewRender({
  type: "react",
  basePath: `/views/`,
  getBody: async (path: string, model: Object, config: any) =>
      await getPage(path, model),
});

addEventListener("fetch",(event: FetchEvent) => {
  event.respondWith(app.handleRequest(event.request));
});


