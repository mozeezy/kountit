import { render, screen } from "@testing-library/react";
import Home from "../Home";

// describe("Home", () => {
//   it("should render home component", () => {
//     render(<Home />);
//     const homeElement = screen.getByTestId("1");
//     expect(homeElement).toBeInTheDocument();
//   });
// });

test("should render home component", () => {
  render(<Home />);
  const homeElement = screen.getByTestId("home");
  expect(homeElement).toBeInTheDocument();
});
