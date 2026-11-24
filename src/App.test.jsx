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
    expect(screen.getAllByText(/naga extension campus/i).length).toBeGreaterThan(0);
  });

  it("provides the required primary navigation destinations", () => {
    render(<App />);
    const navigation = screen.getByRole("navigation", { name: /primary/i });
    const destinations = [
      ["Home", "#home"],
      ["About", "#about"],
      ["Campus News", "#news"],
      ["Student Services", "#services"],
      ["Events", "#events"]
    ];
    for (const [label, href] of destinations) {
      expect(within(navigation).getByRole("link", { name: label })).toHaveAttribute("href", href);
    }
  });

  it("shows campus-specific facts and official contact routes", () => {
    render(<App />);
    expect(screen.getAllByText(/870 bonifacio st/i).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: /cdnaga@ctu\.edu\.ph/i })[0]).toHaveAttribute("href", "mailto:cdnaga@ctu.edu.ph");
    expect(screen.getByRole("link", { name: /undergraduate programs/i })).toHaveAttribute("href", "https://www.ctu.edu.ph/naga/academics/undergraduate-programs/");
  });

  it("renders at least three campus service cards", () => {
    render(<App />);
    const services = document.getElementById("services");
    expect(within(services).getAllByRole("article").length).toBeGreaterThanOrEqual(3);
  });

  it("uses current Naga campus news rather than generic CTU main-campus headlines", () => {
    render(<App />);
    expect(screen.getByRole("heading", { name: /life-saving skills in bls and first aid/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /icpa capacity-building training/i })).toBeInTheDocument();
  });

  it("includes a keyboard skip link and the 3D hero mount", () => {
    render(<App />);
    expect(screen.getByTestId("three-scene")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /skip to main content/i })).toHaveAttribute("href", "#main-content");
  });
});
