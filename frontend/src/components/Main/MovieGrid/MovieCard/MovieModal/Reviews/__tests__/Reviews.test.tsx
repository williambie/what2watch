import { render, waitFor, screen } from "../../../../../../../utils/test-utils";
import { MockedProvider } from "@apollo/client/testing";
import Reviews from "../Reviews";
import { GET_USER, GET_REVIEWS } from "../../../../../../../queries/queries";
import { Movie } from "../../../../../../../types/types";

const mockMovie: Movie = {
  genres: [],
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
  cast: [],
};

const mocks = [
  {
    request: {
      query: GET_USER,
    },
    result: {
      data: { user: { username: "Martha", id: 1 } },
      delay: 100,
    },
  },
  {
    request: {
      query: GET_REVIEWS,
      variables: {
        id: mockMovie.id,
      },
    },
    result: {
      data: {
        movie: {
          reviews: [
            {
              id: 11,
              content: "Test",
              rating: 4,
              timestamp: "November 21, 2023 at 7:45 AM",
              userid: 1,
            },
          ],
        },
      },
    },
  },
];

test("renders without crashing", () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Reviews movie={mockMovie} />
    </MockedProvider>,
  );
});

test("displays loading spinner while fetching user", () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Reviews movie={mockMovie} />
    </MockedProvider>,
  );

  expect(screen.getByText("Loading...")).toBeInTheDocument();
});

test("displays user reviews after fetching", async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Reviews movie={mockMovie} />
    </MockedProvider>,
  );

  await waitFor(() => screen.getByRole("heading"));

  expect(screen.getByText("Test")).toBeInTheDocument();
  expect(screen.getByText("Martha")).toBeInTheDocument();
  expect(screen.getByText("November 21, 2023 at 7:45 AM")).toBeInTheDocument();
});
