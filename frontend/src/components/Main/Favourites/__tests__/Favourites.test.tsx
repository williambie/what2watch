import { render, screen } from "../../../../utils/test-utils";
import { MockedProvider } from "@apollo/client/testing";
import Favourites from "../Favourites";
import { GET_FAVOURITE_MOVIES } from "../../../../queries/queries";

const mocks = [
  {
    request: {
      query: GET_FAVOURITE_MOVIES,
    },
    result: {
      data: {
        favouriteMovies: [],
      },
    },
  },
];

describe("Favourites", () => {
  test("renders without crashing", () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Favourites />
      </MockedProvider>,
    );
  });

  test("displays the correct heading", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Favourites />
      </MockedProvider>,
    );

    expect(screen.getByText("My Favourite Movies")).toBeInTheDocument();
  });
});
