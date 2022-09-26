import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import Login from "../components/Login";

describe("Login Component", () => {
  test("render Login Component", () => {
    render(<Login />, { wrapper: BrowserRouter });
    const linkElement = screen.getByTestId("loginsection");
    //const div = waitForElement(() => screen.getByTestId('divContainer'));
    expect(linkElement).toBeInTheDocument();
  });
});
