import { render, screen } from "../../../../../../utils/test-utils";
import MovieModal from "../MovieModal";
import { Movie } from "../../../../../../types/types";

const mockMovie: Movie = {
  genres: [
    {
      id: 1,
      name: "Action",
      movies: [],
      moviesInGenreCount: 0,
      count: 0,
    },
  ],
  adult: false,
  backdrop_path: "/test.jpg",
  genre_ids: [1],
  id: 1,
  original_language: "en",
  original_title: "Test Movie",
  overview: "Test overview",
  popularity: 10,
  poster_path: "/test.jpg",
  release_date: "2022-01-01",
  title: "Test Movie",
  video: false,
  vote_average: 8,
  vote_count: 100,
  reviews: [],
  favourite: false,
  cast: [
    {
      name: "Josh Hutcherson",
      character: "Mike",
      profile_path: "/npowygg8rH7uJ4v7rAoDMsHBhNq.jpg",
    },
    {
      name: "Piper Rubio",
      character: "Abby",
      profile_path: "/x8tDKAgxMKwaNJSd9RB75EIJnOD.jpg",
    },
    {
      name: "Elizabeth Lail",
      character: "Vanessa",
      profile_path: "/lDYjEyqojUs2sF3CgdsOZ9vr2KL.jpg",
    },
  ],
};

describe("MovieModal", () => {
  it("renders the correct movie title", () => {
    render(
      <MovieModal
        movie={mockMovie}
        isOpen={true}
        onClose={() => {}}
        isFavourite={false}
      />,
    );
    expect(screen.getByText(mockMovie.title)).toBeInTheDocument();
  });

  it("renders UserVoteAverage with the correct vote_average", () => {
    render(
      <MovieModal
        movie={mockMovie}
        isOpen={true}
        onClose={() => {}}
        isFavourite={false}
      />,
    );
    expect(
      screen.getByText(mockMovie.vote_average.toFixed(1)),
    ).toBeInTheDocument();
  });

  it("renders the correct release date", () => {
    render(
      <MovieModal
        movie={mockMovie}
        isOpen={true}
        onClose={() => {}}
        isFavourite={false}
      />,
    );
    expect(
      screen.getByText("Release Date: January 1, 2022"),
    ).toBeInTheDocument();
  });

  it("renders the correct overview", () => {
    render(
      <MovieModal
        movie={mockMovie}
        isOpen={true}
        onClose={() => {}}
        isFavourite={false}
      />,
    );
    expect(screen.getByText(mockMovie.overview)).toBeInTheDocument();
  });

  it("renders the correct genres", () => {
    render(
      <MovieModal
        movie={mockMovie}
        isOpen={true}
        onClose={() => {}}
        isFavourite={false}
      />,
    );
    expect(screen.getByText("Action")).toBeInTheDocument();
  });

  it("renders the correct cast", () => {
    render(
      <MovieModal
        movie={mockMovie}
        isOpen={true}
        onClose={() => {}}
        isFavourite={false}
      />,
    );
    expect(screen.getByText("Josh Hutcherson")).toBeInTheDocument();
    expect(screen.getByText("Piper Rubio")).toBeInTheDocument();
    expect(screen.getByText("Elizabeth Lail")).toBeInTheDocument();
  });
});
