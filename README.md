# Alosaur-lite

Lightweight version of Alosaur (4kb, one file). Specially designed to work with deno deploy.

Supports:

- [x] Controllers
- [x] Actions methods (GET, POST, etc)
- [ ] Serve static files
- [ ] Other decorators
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


```
