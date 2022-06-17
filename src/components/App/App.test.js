import { render, screen } from "@testing-library/react";
import App from "./App";

test("there is a button present", () => {
  render(<App />);
  const startButton = screen.getByText("Get the best words!");
  expect(startButton).toBeInTheDocument();
});
