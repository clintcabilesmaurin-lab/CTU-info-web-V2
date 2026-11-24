import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen, within } from "@testing-library/react";

vi.mock("./components/ThreeScene.jsx", () => ({
  default: () => <div aria-hidden="true" data-testid="three-scene" />
}));

import App from "./App.jsx";

afterEach(cleanup);

describe("CTU Naga campus information website", () => {
  it("introduces the correct campus and keeps the original campaign line", () => {
    render(<App />);
    expect(screen.getByRole("heading", { name: /learn with purpose\. lead with impact/i })).toBeInTheDocument();
    expect(screen.getByText(/ctu naga extension campus/i)).toBeInTheDocument();
  });

  it("provides the required primary navigation destinations", () => {
    render(<App />);
    const navigation = screen.getByRole("navigation", { name: /primary/i });
    for (const label of ["Home", "About", "Campus News", "Student Services", "Events"]) {
      expect(within(navigation).getByRole("link", { name: label })).toHaveAttribute("href", `#${label === "Campus News" ? "news" : label === "Student Services" ? "services" : label.toLowerCase()}`);
    }
  });

  it("shows campus-specific facts and the official contact route", () => {
    render(<App />);
    expect(screen.getByText(/870 bonifacio st/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /cdnaga@ctu\.edu\.ph/i })).toHaveAttribute("href", "mailto:cdnaga@ctu.edu.ph");
    expect(screen.getByRole("link", { name: /undergraduate programs/i })).toHaveAttribute("href", "https://www.ctu.edu.ph/naga/academics/undergraduate-programs/");
  });

  it("renders at least three campus service cards", () => {
    render(<App />);
    const services = screen.getByRole("region", { name: /student services/i });
    expect(within(services).getAllByRole("article").length).toBeGreaterThanOrEqual(3);
  });

  it("uses current Naga campus news rather than generic CTU main-campus headlines", () => {
    render(<App />);
    expect(screen.getByRole("heading", { name: /life-saving skills in bls and first aid/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /icpa capacity-building training/i })).toBeInTheDocument();
  });

  it("includes a reduced-motion accessible experience and the 3D hero mount", () => {
    render(<App />);
    expect(screen.getByTestId("three-scene")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /skip to main content/i })).toHaveAttribute("href", "#main-content");
  });
});
