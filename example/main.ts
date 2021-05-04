import { App } from "../mod.ts";
import { Controller, Get } from "../decorators.ts";

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
