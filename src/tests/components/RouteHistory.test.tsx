/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";

import RoutesHistory from "../../components/RoutesHistory";

const routes = [
  {
    start: {
      id: "1",
      title: "start",
      lat: 1,
      lng: 1,
    },
    end: {
      id: "2",
      title: "end",
      lat: 2,
      lng: 2,
    },
  },
];

describe("test RoutesHistory component", () => {
  test("renders RoutesHistory component", async () => {
    render(
      <BrowserRouter>
        <RoutesHistory routes={routes as any} />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("History")).toBeTruthy();
    });
  });

  test("renders RoutesHistory component with routes", async () => {
    render(
      <BrowserRouter>
        <RoutesHistory routes={routes as any} />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("From: start")).toBeTruthy();
      expect(screen.getByText("To: end")).toBeTruthy();
    });

    test("handles route", async () => {
      render(
        <BrowserRouter>
          <RoutesHistory routes={routes as any} />
        </BrowserRouter>
      );

      await waitFor(() => {
        expect(screen.getByText("From: start")).toBeTruthy();
        expect(screen.getByText("To: end")).toBeTruthy();
      });

      await userEvent.click(screen.getByRole("button"));

      await waitFor(() => {
        expect(screen.getByText("Get route")).toBeFalsy();
      });
    });
  });
});
