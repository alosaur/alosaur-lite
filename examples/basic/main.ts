import { App, Content, Controller, Get, Param, QueryParam } from "../../mod.ts";

// import { App, Content, Controller, Get, Param, QueryParam } from "../dist/mod.js";

@Controller() // or @Controller('specific-route')
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
    return { data: "test" };
  }

  @Get("/not")
  notPage() {
    return Content("Not authorized", 401);
  }

  @Get("/page/:id")
  paramPage(@Param("id") id: string, @QueryParam("filter") filter: string) {
    return `Id: ${id} Filter: ${filter}`;
  }
}

const app = new App({
  controllers: [MainController],
});

app.useStatic({
  root: import.meta.url,
  index: "index.html",
  // baseRoute: "/www/",
} // or undefined for default route /
);

addEventListener("fetch", (event: FetchEvent) => {
  event.respondWith(app.handleRequest(event.request));
});
