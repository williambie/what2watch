import { render, screen, waitFor, act } from "../../../utils/test-utils";
import Main from "../Main";

describe("Main", () => {
  beforeEach(async () => {
    await act(async () => {
      await render(<Main />);
    });
  });

  it("renders the Genre filter button", async () => {
    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: /Genres/i }),
      ).toBeInTheDocument();
    });
  });

  it("renders the order by button", async () => {
    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: /Order by: Popularity/i }),
      ).toBeInTheDocument();
    });
  });

  it("renders the reset filters button", async () => {
    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: /Reset filters/i }),
      ).toBeInTheDocument();
    });
  });
});
