// ProfileButton.test.tsx
import { render, screen, fireEvent } from "../../../../utils/test-utils";
import ProfileButton from "../ProfileButton";
import { MockedProvider } from "@apollo/client/testing";
import { GET_USER } from "../../../../queries/queries";

const mocks = [
  {
    request: {
      query: GET_USER,
    },
    result: {
      data: {
        user: {
          username: "Martha",
          id: 1,
          __typename: "User",
        },
      },
    },
  },
];

describe("ProfileButton", () => {
  beforeEach(() => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ProfileButton />
      </MockedProvider>,
    );
  });

  test("renders button, avatar, and chevron icon", () => {
    const menuButtonElement = screen.getByRole("button");
    expect(menuButtonElement).toBeInTheDocument();

    const avatarElement = screen.getByLabelText("User avatar");
    expect(avatarElement).toBeInTheDocument();

    const chevronDownIconElement = screen.getByLabelText("Chevron Down Icon");
    expect(chevronDownIconElement).toBeInTheDocument();
  });

  test("does not render menu initially", () => {
    const menuItemElement = screen.queryByText(/my favourites/i);
    expect(menuItemElement).not.toBeVisible();
  });

  test("renders menu after button click", () => {
    const menuButtonElement = screen.getByRole("button", {
      name: /User avatar/i,
    });
    fireEvent.click(menuButtonElement);

    expect(screen.getByText(/my favourites/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Switch to dark mode/i)).toBeInTheDocument();
  });
});
