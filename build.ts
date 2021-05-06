import * as esbuild from "https://deno.land/x/esbuild@v0.11.12/mod.js";

esbuild.build({
  entryPoints: ["./mod.ts"],
  outfile: "./dist/mod.js",
  bundle: true,
  minify: true,
  format: "esm",
}).then((result: any, error: any) => {
  esbuild.stop();
});
