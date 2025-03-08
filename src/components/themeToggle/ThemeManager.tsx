'use client';

import { useTheme } from '../../context/ThemeContext';
import ThemeToggle from '../themeToggle/ThemeToggle';

const ThemeManager = () => {
  const { theme, toggleTheme } = useTheme();

  return <ThemeToggle theme={theme} toggleTheme={toggleTheme} />;
};

export default ThemeManager;
