import {
  render,
  screen,
  fireEvent,
  act,
} from "../../../../../../../utils/test-utils";
import { MockedProvider } from "@apollo/client/testing";
import FavouriteButton from "../FavouriteButton";
import {
  TOGGLE_FAVOURITE,
  GET_FAVOURITE_MOVIES,
} from "../../../../../../../queries/queries";
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
      query: TOGGLE_FAVOURITE,
      variables: { movieid: mockMovie.id },
    },
    result: {
      data: {
        toggleFavourite: {
          id: "1",
          favourite: false,
          title: "Test Movie",
          poster_path: "/test.jpg",
          vote_average: 8,
          overview: "Test overview",
          release_date: "2022-01-01",
          popularity: 10,
          genres: [],
          reviews: [],
        },
      },
    },
  },
  {
    request: {
      query: GET_FAVOURITE_MOVIES,
    },
    result: {
      data: {
        favouriteMovies: [
          {
            id: "1",
            title: "Test Movie",
            poster_path: "/test.jpg",
            vote_average: 8,
            overview: "Test overview",
            release_date: "2022-01-01",
            popularity: 10,
            genres: [{ id: "1", name: "Action" }],
            reviews: [
              {
                id: "1",
                content: "Great movie!",
                rating: 5,
                timestamp: "2022-01-01T00:00:00Z",
                movieid: "1",
                userid: "1",
              },
            ],
            cast: [
              {
                name: "Test Actor",
                character: "Test Character",
                profile_path: "/test.jpg",
              },
            ],
            favourite: true,
          },
        ],
      },
    },
  },
];

let container: HTMLElement;

describe("FavouriteButton", () => {
  beforeEach(async () => {
    await act(async () => {
      const renderResult = await render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <FavouriteButton movie={mockMovie} isFavourite={true} />
        </MockedProvider>,
      );
      container = renderResult.container;
    });
  });

  it("renders the correct icon based on isFavourite prop", () => {
    const pathElement = container.querySelector("path");
    expect(pathElement).toHaveAttribute(
      "d",
      "M923 283.6a260.04 260.04 0 0 0-56.9-82.8 264.4 264.4 0 0 0-84-55.5A265.34 265.34 0 0 0 679.7 125c-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5a258.44 258.44 0 0 0-56.9 82.8c-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3.1-35.3-7-69.6-20.9-101.9z",
    );
  });

  it("changes icon when clicked", async () => {
    await act(async () => {
      fireEvent.click(screen.getByRole("button"));
    });
    await new Promise((resolve) => setTimeout(resolve, 0));
    const pathElement = container.querySelector("path");
    expect(pathElement).toHaveAttribute(
      "d",
      "M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207,11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z",
    );
  });
});
