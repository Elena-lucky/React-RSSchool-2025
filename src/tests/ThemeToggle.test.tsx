import { render, screen, fireEvent } from '@testing-library/react';
import ThemeToggle from '../components/themeToggle/ThemeToggle';

describe('ThemeToggle Component', () => {
  it('renders correctly with light theme', () => {
    render(<ThemeToggle theme="light" toggleTheme={() => {}} />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
  });

  it('renders correctly with dark theme', () => {
    render(<ThemeToggle theme="dark" toggleTheme={() => {}} />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toBeChecked();
  });

  it('calls toggleTheme function when clicked', () => {
    const mockToggleTheme = vi.fn();
    render(<ThemeToggle theme="light" toggleTheme={mockToggleTheme} />);

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(mockToggleTheme).toHaveBeenCalledTimes(1);
  });
});
