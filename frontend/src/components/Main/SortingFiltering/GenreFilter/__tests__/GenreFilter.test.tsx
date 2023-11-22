import {
  render,
  fireEvent,
  screen,
  act,
  waitFor,
} from "../../../../../utils/test-utils";
import GenreFilter from "../GenreFilter";

describe("GenreFilter", () => {
  beforeEach(async () => {
    await act(async () => {
      render(<GenreFilter />);
    });
  });

  it("renders without crashing", () => {});

  it("renders the MenuButton component", () => {
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("displays the correct text on the MenuButton", () => {
    expect(screen.getByRole("button")).toHaveTextContent("Genres");
  });

  it("renders the Menu component when the MenuButton is clicked", async () => {
    const menuButtonElement = screen.getByRole("button", { name: /Genres/i });
    fireEvent.click(menuButtonElement);

    // Wait for the asynchronous operation to complete
    await waitFor(() => {
      expect(screen.getByText("All Genres")).toBeInTheDocument();
    });
  });
});
