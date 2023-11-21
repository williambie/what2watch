import { render, screen, fireEvent, spyMiddleware } from "../../../../../utils/test-utils";
import ResetFilters from "../ResetFilters";
import { resetFilter } from "../../../../../redux/searchSlice";

it("dispatches the resetFilter action when clicked", () => {
  spyMiddleware.actions = [];
  render(<ResetFilters />);

  fireEvent.click(screen.getByText(/Reset filters/i));
  expect(spyMiddleware.actions).toContainEqual(resetFilter());
});