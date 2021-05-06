// import { App } from "../src/mod.ts";
// import { Controller, Get } from "../src/decorators.ts";
import { App, Controller, Get } from "../dist/mod.js";

@Controller()
export class MainController {
  @Get()
  indexPage() {
    return "index page";
  }

  @Get("/home")
  lolPage() {
    return "home page";
  }
}

const app = new App({
  controllers: [MainController],
});

addEventListener("fetch", (event: FetchEvent) => {
  event.respondWith(app.handleRequest(event.request));
});
