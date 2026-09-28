// Build-time pre-render entry (see scripts/prerender.mjs). Renders a route to
// static HTML so crawlers get real text instead of an empty #root.
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { AppProviders, AppRoutes } from "./App";

export function render(url: string) {
  return renderToString(
    <AppProviders>
      <StaticRouter location={url}>
        <AppRoutes />
      </StaticRouter>
    </AppProviders>,
  );
}
