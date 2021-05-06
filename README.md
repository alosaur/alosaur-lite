# [WIP] Alosaur-lite

Lightweight version of Alosaur (4kb, one file) without dependencies. Specially designed to work with deno deploy.

TODO:

- [x] Controllers
- [x] Actions methods (GET, POST, etc)
- [ ] Serve static files
- [ ] Render pages
- [ ] Middlewares:
-
  - [ ] CORS
-
  - [ ] Static files
-
  - [ ] Custom middleware


### Example:

```ts
import {App, Controller, Get, Content} from "https://raw.githubusercontent.com/alosaur/alosaur-lite/master/dist/mod.js";

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

  @Get("/json")
  jsonPage() {
    return {data: "test"};
  }

  @Get("/not")
  notPage() {
    return Content("Not authorized", 401);
  }
}

const app = new App({
  controllers: [MainController],
});

addEventListener("fetch", (event: FetchEvent) => {
  event.respondWith(app.handleRequest(event.request));
});


```
