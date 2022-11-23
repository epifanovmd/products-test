import "./assets/global.scss";

import { loadableReady } from "@loadable/component";
import React from "react";
import { createRoot, hydrateRoot, Root } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

const getApp = (Comp?: any) => (
  <BrowserRouter>
    <Comp />
  </BrowserRouter>
);

const start = () => {
  const container = document.getElementById("root")!;

  if (IS_SSR && typeof window === "object") {
    return hydrateRoot(container, getApp(App));
  } else {
    const root = createRoot(container);

    root.render(getApp(App));

    return root;
  }
};

let updateApp: Root | null = null;

loadableReady(() => {
  updateApp = start();
}).finally();

if ((module as any).hot && updateApp) {
  (module as any).hot.accept("./App", () => {
    const NewApp = require("./App").default;

    updateApp?.render(getApp(NewApp));
  });
}
