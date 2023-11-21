import { render } from '../../../../../utils/test-utils';
import LoadingCard from '../LoadingCard';

describe('LoadingCard', () => {
  it('renders without crashing', () => {
    const { container } = render(<LoadingCard />);
    expect(container.querySelector('.chakra-skeleton')).toBeInTheDocument();
  });
});