import { ChunkExtractor } from "@loadable/server";
import { Request, Response } from "express-serve-static-core";
import path from "path";
import React from "react";
import { renderToString } from "react-dom/server";
import Helmet from "react-helmet";
import { matchPath } from "react-router";
import { StaticRouter } from "react-router-dom/server";
import { ServerStyleSheet } from "styled-components";

import App from "../App";
import { template } from "./template";
import { routes } from "../routes";
import { enableStaticRendering } from "mobx-react-lite";
import { flatten } from "lodash";
import { initialData as _initialData } from "../common";
import axios from "axios";

export const serverRenderer = () => (req: Request, res: Response) => {
  const webStats = path.resolve("./build/loadable-stats.json");
  const webExtractor = new ChunkExtractor({
    statsFile: webStats,
    entrypoints: ["client"],
  });

  enableStaticRendering(true);

  axios.defaults.headers.common = {
    cookie: req.headers.cookie || "",
  };

  const sheet = new ServerStyleSheet();
  const location = req.url;
  const initialData: any = {};

  _initialData.clearData();

  // Fetch initial data and set to store
  const dataRequirements = routes
    .filter(route => matchPath(location, route.path) && route.getInitialData)
    .map(route =>
      route.getInitialData?.map(item =>
        item[1]()?.then(res => {
          initialData[item[0]] = res;
          _initialData.setData(item[0], res);

          return res;
        }),
      ),
    );

  Promise.all(flatten(dataRequirements)).then(() => {
    const jsx = webExtractor.collectChunks(
      <StaticRouter location={location}>
        <App />
      </StaticRouter>,
    );
    const reactDom = renderToString(sheet.collectStyles(jsx));
    const styles = sheet.getStyleTags();
    const helmetData = Helmet.renderStatic();

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(template(reactDom, initialData, helmetData, webExtractor, styles));
  });
};
