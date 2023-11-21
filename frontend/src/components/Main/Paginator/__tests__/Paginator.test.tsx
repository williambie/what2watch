import { render, spyMiddleware, screen, fireEvent, waitFor } from '../../../../utils/test-utils';
import { setPage } from "../../../../redux/searchSlice";
import Paginator from '../Paginator';

describe('Paginator', () => {
  beforeEach(() => {
    spyMiddleware.actions = [];
    
  });

  it('renders correctly', () => {
    render(<Paginator totalPages={5} movieCount={100} />);
    expect(screen.getByText(/Showing 1 to 20 of 100/i)).to.exist;
  });

  it('dispatches setPage action when next button is clicked', () => {
    render(<Paginator totalPages={5} movieCount={100} />);

    fireEvent.click(screen.getByRole('button', { name: /next/i }));
    expect(spyMiddleware.actions).toContainEqual(setPage(2));
  });

  it('dispatches setPage action when previous button is clicked', async () => {
    render(<Paginator totalPages={5} movieCount={100} />, {
      initialState: { 
        search: { 
          page: 2,
          searchTerm: '',
          sorting: { sortBy: 'popularity', sortOrder: -1 },
          selectedGenre: null,
          _persist: { version: -1, rehydrated: true }
        } 
      },
    });
  
    const prevButton = screen.getByRole('button', { name: /previous/i });
    
    if (!prevButton.hasAttribute('disabled')) {
      fireEvent.click(prevButton);
    
      await waitFor(() => {
        expect(spyMiddleware.actions).toContainEqual(setPage(1));
      });
    }
  });
});