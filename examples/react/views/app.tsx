import { h } from "https://x.lcas.dev/preact@10.5.12/mod.js";
import { renderToString } from "https://x.lcas.dev/preact@10.5.12/ssr.js";

const Home = () => (
  <div>
    <p>Hello to my page!</p>
    <a href="/contacts">Go to contacts</a>
  </div>
);

const Contacts = () => (
  <div>
    <p>Contacts page</p>
    <a href="/">Go to home</a>
  </div>
);

export const getPage = (path: string, model: Object) => {
  return renderToString(
    path === "contacts"
      ? (
        <Contacts />
      )
      : (
        <Home />
      ),
  );
};
