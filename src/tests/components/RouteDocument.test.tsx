import React from "react";
import { render } from "@testing-library/react";

import RouteDocument from "../../components/RouteDocument";

describe("test RouteDocument component", () => {
  test("renders RouteDocument component", async () => {
    render(<RouteDocument from="start" to="end" routeLength={2000} routeTime={2000} routePrice={200} routePricePerKm="20" />);
  });
});
