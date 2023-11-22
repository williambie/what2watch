import { screen, fireEvent } from "@testing-library/react";
import { render } from "../../../../utils/test-utils";
import SearchBar from "../SearchBar";

describe("SearchBar", () => {
  it("renders an input field", () => {
    render(<SearchBar />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("updates the input value on change", () => {
    const input = "Matrix";
    render(<SearchBar />);
    fireEvent.change(screen.getByRole("textbox"), { target: { value: input } });
    expect(screen.getByRole("textbox")).toHaveValue(input);
  });
});
