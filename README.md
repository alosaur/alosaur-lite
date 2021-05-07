# [WIP] Alosaur-lite

Lightweight version of Alosaur (4kb, one file) without dependencies. Specially designed to work with deno deploy.

TODO:

- [x] Controllers
- [x] Actions methods (GET, POST, etc)
- [x] Serve static files
- [ ] Render pages
- [ ] Middlewares:
  - [ ] CORS
  - [ ] Static files
  - [ ] Custom middleware
  - [ ] WebSocket
  
### Example:

```ts
import {App, Content, Controller, Get, Param, QueryParam} from "https://raw.githubusercontent.com/alosaur/alosaur-lite/master/dist/mod.js";

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
  paramPage(@Param("id") id: string, @QueryParam('filter') filter: string) {
    return `Id: ${id} Filter: ${filter}`;
  }
}

const app = new App({
  controllers: [MainController],
});

addEventListener("fetch", (event: FetchEvent) => {
  event.respondWith(app.handleRequest(event.request));
});


```



How to serve static files? 

```ts
app.useStatic({
      root: import.meta.url,
      index: "index.html",
      baseRoute: "/www/",
    } // or undefined for default route /
);
```
