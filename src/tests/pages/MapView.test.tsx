import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import { MemoryRouter } from "react-router-dom";

import RoutesGeocodesContext from "../../storage/RouteGeocodesProvider";
import App from "../../App";

describe("test MapView page", () => {
  test("navigates to Home page if no routesGeocodes", async () => {
    render(
      <RoutesGeocodesContext.Provider value={{ routesGeocodes: null, setCodes: vi.fn(), removeCodes: vi.fn() }}>
        <MemoryRouter initialEntries={["/map"]}>
          <App />
        </MemoryRouter>
      </RoutesGeocodesContext.Provider>
    );

    await waitFor(() => {
      expect(screen.getByText("Write your starting address and your destination address")).toBeTruthy();
    });
  });
});
