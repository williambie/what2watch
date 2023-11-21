import { render, screen } from '../../../../../../utils/test-utils';
import UserVoteAverage from '../UserVoteAverage';

describe('UserVoteAverage', () => {
  it('renders the vote average with one decimal place', () => {
    render(<UserVoteAverage vote_average={8.123} />);
    expect(screen.getByText('8.1')).toBeInTheDocument();
  });

  it('renders with the correct color for vote_average > 7.5', () => {
    render(<UserVoteAverage vote_average={8} />);
    const voteAverageElement = screen.getByText('8.0');
    expect(voteAverageElement).toHaveClass('chakra-badge css-10z3bbz');
  });

  it('renders with the correct color for 6 < vote_average <= 7.5', () => {
    render(<UserVoteAverage vote_average={7} />);
    expect(screen.getByText('7.0')).toHaveClass('chakra-badge css-1q9pbwu');
  });

  it('renders with the correct color for vote_average <= 6', () => {
    render(<UserVoteAverage vote_average={6} />);
    expect(screen.getByText('6.0')).toHaveClass('chakra-badge css-xl9gbo');

  });
});