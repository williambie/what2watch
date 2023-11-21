import { render, screen } from "../../../utils/test-utils";
import Navbar from "../Navbar";

test("renders Navbar component", () => {
  render(<Navbar />);

  // Check if the logo is in the document
  const logoElement = screen.getByAltText(/logo/i);
  expect(logoElement).toBeInTheDocument();

  // Check if the ProfileButton is in the document
  const profileButtonElement = screen.getByRole("button");
  expect(profileButtonElement).toBeInTheDocument();

});

test('renders Home button when on /favourites route', () => {
  render(<Navbar />, { initialRoutes: ['/favourites'] });
  const homeButtonElement = screen.getByRole('button', { name: /home/i });
  expect(homeButtonElement).toBeInTheDocument();
});

test('renders SearchBar when not on /favourites route', () => {
  render(<Navbar />, { initialRoutes: ['/'] });
  const searchBarElement = screen.getByRole('textbox');
  expect(searchBarElement).toBeInTheDocument();
});