import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "leaflet/dist/leaflet.css";

import App from "./App";
import { RouteGeocodesProvider } from "./storage/RouteGeocodesProvider";
import "./styles.css";
import { HistoryProvider } from "./storage/HistoryProvider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <HistoryProvider>
        <RouteGeocodesProvider>
          <App />
        </RouteGeocodesProvider>
      </HistoryProvider>
    </BrowserRouter>
  </React.StrictMode>
);
