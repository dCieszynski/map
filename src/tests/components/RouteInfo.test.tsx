import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import RouteInfo from "../../components/RouteInfo";

describe("test RouteInfo component", () => {
  test("renders RouteInfo component", async () => {
    render(<RouteInfo routeLength={1000} start="start" end="end" />);

    await waitFor(() => {
      expect(screen.getByText("Route length: 1km")).toBeTruthy();
      expect(screen.getByText("From: start")).toBeTruthy();
      expect(screen.getByText("To: end")).toBeTruthy();
      expect(screen.getByText("Price: 3.3PLN")).toBeTruthy();
    });
  });

  test("sets priceInput to 0 if empty", async () => {
    render(<RouteInfo routeLength={1000} start="start" end="end" />);

    await userEvent.clear(screen.getByLabelText("Change price per km"));

    await waitFor(() => {
      expect(screen.getByText("Price per km: 0PLN")).toBeTruthy();
      expect(screen.getByLabelText("Change price per km").getAttribute("value")).toBe("0");
    });
  });

  test("removes from priceInput 0 if priceInput length greater than 1", async () => {
    render(<RouteInfo routeLength={1000} start="start" end="end" />);

    await userEvent.clear(screen.getByLabelText("Change price per km"));
    await userEvent.type(screen.getByLabelText("Change price per km"), "01");

    await waitFor(() => {
      expect(screen.getByLabelText("Change price per km").getAttribute("value")).toBe("1");
      expect(screen.getByText("Price per km: 1PLN")).toBeTruthy();
    });
  });
});
