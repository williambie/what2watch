import { render, screen, fireEvent, waitFor } from "../../../../../utils/test-utils";
import MovieCard from "../MovieCard";
import { MockedProvider } from "@apollo/client/testing";
import { CHECK_FAVOURITE } from "../../../../../queries/queries";
import { Movie } from "../../../../../types/types";

const mockMovie: Movie = {
  genres: [],
  adult: false,
  backdrop_path: '/test.jpg',
  genre_ids: [1],
  id: 1,
  original_language: 'en',
  original_title: 'Test Movie',
  overview: 'Test overview',
  popularity: 10,
  poster_path: '/test.jpg',
  release_date: '2022-01-01',
  title: 'Test Movie',
  video: false,
  vote_average: 8,
  vote_count: 100,
  reviews: [],
  favourite: false,
  cast: [],
};

const mocks = [
  {
    request: {
      query: CHECK_FAVOURITE,
      variables: { movieid: mockMovie.id },
    },
    result: {
      data: { isFavourite: false },
    },
  },
];

describe("MovieCard", () => {
  it("renders movie details correctly", () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MovieCard movie={mockMovie} />
      </MockedProvider>,
    );

    expect(screen.getByText(mockMovie.title)).toBeInTheDocument();
    expect(screen.getByAltText(`Poster of the movie ${mockMovie.title}`)).toHaveAttribute(
      "src",
      `https://image.tmdb.org/t/p/w500${mockMovie.poster_path}`,
    );
    expect(
      screen.getByText(mockMovie.vote_average.toFixed(1)),
    ).toBeInTheDocument();
  });
});
