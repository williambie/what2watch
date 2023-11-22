import { render, screen, fireEvent } from "@testing-library/react";
import { ChakraProvider } from "@chakra-ui/react";
import ColorModeSwitch from "../ColorModeSwitch";

describe("ColorModeSwitch", () => {
  it("renders without crashing", () => {
    render(<ColorModeSwitch />, { wrapper: ChakraProvider });
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
  });

  it("renders a checkbox", () => {
    render(<ColorModeSwitch />, { wrapper: ChakraProvider });
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
  });

  it("changes checkbox state when clicked", () => {
    render(<ColorModeSwitch />, { wrapper: ChakraProvider });
    const checkboxElement = screen.getByRole("checkbox");
    fireEvent.click(checkboxElement);
    expect(checkboxElement).toBeChecked();
  });
});
