import { render, screen, fireEvent, act } from '@testing-library/react';
import { ThemeProvider, useTheme } from '../context/ThemeContext';
import { vi } from 'vitest';

const TestComponent = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <p data-testid="theme">{theme}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};

describe('ThemeContext', () => {
  it('provides default dark theme', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme').textContent).toBe('dark');
  });

  it('toggles theme between light and dark', async () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    const themeText = screen.getByTestId('theme');
    const button = screen.getByText(/toggle theme/i);

    expect(themeText.textContent).toBe('dark');

    await act(async () => {
      fireEvent.click(button);
    });

    expect(themeText.textContent).toBe('light');

    await act(async () => {
      fireEvent.click(button);
    });

    expect(themeText.textContent).toBe('dark');
  });

  it('updates data-theme attribute in document', async () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');

    const button = screen.getByText(/toggle theme/i);

    await act(async () => {
      fireEvent.click(button);
    });

    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });

  it('throws an error when useTheme is used outside of ThemeProvider', () => {
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    expect(() => render(<TestComponent />)).toThrow('useTheme is errored');

    consoleErrorSpy.mockRestore();
  });
});
