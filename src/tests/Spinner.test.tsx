import { render, screen } from '@testing-library/react';
import Spinner from '../components/spinner/Spinner';

describe('Spinner Component', () => {
  it('renders a spinner with a progressbar role', () => {
    render(<Spinner />);

    const spinnerElement = screen.getByRole('progressbar');

    expect(spinnerElement).toBeInTheDocument();
  });
});
