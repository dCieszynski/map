/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";

import Home from "../../pages/Home";
import * as api from "../../api";

describe("test Home page", () => {
  test("renders Home page", () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    expect(screen.getByText("Write your starting address and your destination address")).toBeTruthy();
  });

  test("renders Home page with validation message", () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    fireEvent.change(screen.getByLabelText("Starting address"), {
      target: { value: "test" },
    });
    fireEvent.change(screen.getByLabelText("Destination address"), {
      target: { value: "test" },
    });

    expect(screen.getByText("You have to provide more information")).toBeTruthy();
  });

  test("renders Home page with validation message if no street number", async () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    await userEvent.type(screen.getByLabelText("Starting address"), "test test");
    await userEvent.type(screen.getByLabelText("Destination address"), "test test");

    await waitFor(() => expect(screen.getByText("Addresses have to contain a street number")).toBeTruthy());
  });

  test("validation message not visible if addresses are valid", async () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    await userEvent.type(screen.getByLabelText("Starting address"), "33 test");
    await userEvent.type(screen.getByLabelText("Destination address"), "12 test");

    await waitFor(() => expect(screen.queryByText("Addresses have to contain a street number")).toBeFalsy());
  });

  test("if is valid and addresses are valid, navigate to map page", async () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    vi.spyOn(window, "fetch").mockImplementation(() =>
      Promise.resolve({ json: () => Promise.resolve({ items: [{ position: { lat: 1, lng: 1 } }] }) } as any)
    );

    await userEvent.type(screen.getByLabelText("Starting address"), "33 test");
    await userEvent.type(screen.getByLabelText("Destination address"), "12 test");

    await waitFor(() => expect(screen.queryByText("Addresses have to contain a street number")).toBeFalsy());

    await userEvent.click(screen.getByText("Get route"));

    await waitFor(() => expect(window.location.pathname).toBe("/map"));
  });

  test("if is valid and addresses not valid display validation message", async () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    vi.spyOn(window, "fetch").mockImplementation(() => Promise.resolve({ json: () => Promise.resolve({ items: [] }) } as any));

    await userEvent.type(screen.getByLabelText("Starting address"), "33 test");
    await userEvent.type(screen.getByLabelText("Destination address"), "12 test");

    await waitFor(() => expect(screen.queryByText("Addresses have to contain a street number")).toBeFalsy());

    await userEvent.click(screen.getByText("Get route"));

    await waitFor(() => expect(screen.getByText("Addresses not found")).toBeTruthy());
  });

  test("if destination address not found display validation message", async () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    vi.spyOn(api, "getGeocoordinates").mockResolvedValueOnce({ items: [{ position: { lat: 1, lng: 1 } }] } as any);

    vi.spyOn(api, "getGeocoordinates").mockResolvedValueOnce({ items: [] } as any);

    await userEvent.type(screen.getByLabelText("Starting address"), "Warsaw plac Defilad 11");
    await userEvent.type(screen.getByLabelText("Destination address"), "111 test");

    await userEvent.click(screen.getByText("Get route"));

    await waitFor(() => {
      expect(screen.getByText("Starting address not found")).toBeTruthy();
    });
  });

  test("if destination address not found display validation message", async () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    vi.spyOn(api, "getGeocoordinates").mockResolvedValueOnce({ items: [] } as any);

    vi.spyOn(api, "getGeocoordinates").mockResolvedValueOnce({ items: [{ position: { lat: 1, lng: 1 } }] } as any);

    await userEvent.type(screen.getByLabelText("Starting address"), "123 test");
    await userEvent.type(screen.getByLabelText("Destination address"), "Warsaw plac Defilad 11");

    await userEvent.click(screen.getByText("Get route"));

    await waitFor(() => {
      expect(screen.getByText("Destination address not found")).toBeTruthy();
    });
  });
});
