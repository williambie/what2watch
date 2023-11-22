import { render, screen } from "../../../../utils/test-utils";
import MovieGrid from "../MovieGrid";
import { Movie } from "../../../../types/types";

describe("MovieGrid", () => {
  const mockMovies: Movie[] = [];

  it("displays 'No movies found :(' when there are no movies", () => {
    render(<MovieGrid movies={mockMovies} loading={false} />);
    expect(screen.getByText("No movies found :(")).toBeInTheDocument();
  });
});
