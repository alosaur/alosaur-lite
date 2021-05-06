import {App, Content, Controller, Get, Param} from "../mod.ts";
// import { App, Controller, Get } from "../dist/mod.js";

@Controller()
export class MainController {
  @Get()
  indexPage() {
    return "index page";
  }

  @Get("/home")
  homePage() {
    return "home page";
  }

  @Get("/json")
  jsonPage() {
    return {data: "test"};
  }

  @Get("/not")
  notPage() {
    return Content("Not authorized", 401);
  }

  @Get("/page/:id")
  paramPage(@Param("id") id: string) {
    return id;
  }
}

const app = new App({
  controllers: [MainController],
});

addEventListener("fetch", (event: FetchEvent) => {
  event.respondWith(app.handleRequest(event.request));
});
