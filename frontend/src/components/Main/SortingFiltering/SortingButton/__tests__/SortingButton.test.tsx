import userEvent from "@testing-library/user-event";
import { setSorting } from "../../../../../redux/searchSlice";
import SortingButton from "../SortingButton";
import { render, spyMiddleware, screen } from "../../../../../utils/test-utils";

describe("SortingButton", () => {
  beforeEach(() => {
    spyMiddleware.actions = []; // Clear any previous actions
    render(<SortingButton />);
    userEvent.click(screen.getByRole('button', { name: /Order by:/i }));
  });

  it('dispatches setSorting action when "Popularity" is clicked', async () => {
    const option = await screen.findByRole('menuitem', { name: /Popularity/i });
    await userEvent.click(option);

    expect(spyMiddleware.actions).toContainEqual(setSorting({ sortBy: 'popularity', sortOrder: -1 }));
  });

  it('dispatches setSorting action when "User Score" is clicked', async () => {
    const option = await screen.findByRole('menuitem', { name: /User Score/i });
    await userEvent.click(option);

    expect(spyMiddleware.actions).toContainEqual(setSorting({ sortBy: 'vote_average', sortOrder: -1 }));
  });

  it('dispatches setSorting action when "Title (A-Z)" is clicked', async () => {
    const option = await screen.findByRole('menuitem', { name: /Title \(A-Z\)/i });
    await userEvent.click(option);

    expect(spyMiddleware.actions).toContainEqual(setSorting({ sortBy: 'title', sortOrder: 1 }));
  });

  it('dispatches setSorting action when "Title (Z-A)" is clicked', async () => {
    const option = await screen.findByRole('menuitem', { name: /Title \(Z-A\)/i });
    await userEvent.click(option);

    expect(spyMiddleware.actions).toContainEqual(setSorting({ sortBy: 'title', sortOrder: -1 }));
  });
});
