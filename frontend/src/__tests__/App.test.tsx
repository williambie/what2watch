// App.test.tsx
import { render, screen, waitFor, act } from "../utils/test-utils";
import App from "../App";

test("renders Navbar", async () => {
  act(() => {
    render(<App />);
  });

  // Wait for any asynchronous operations to complete
  await waitFor(() => {
    // Add any additional assertions here if needed
    const navbarElement = screen.getByPlaceholderText('Search movies...');
    expect(navbarElement).toBeInTheDocument();
  });
});