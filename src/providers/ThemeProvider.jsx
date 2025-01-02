import { useState, createContext, useContext } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import '@fontsource/inter';
import '@fontsource/quantico';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export default ({ children }) => {
  const [themeMode, setThemeMode] = useState('light'); // 'light' or 'dark'

  const toggleThemeMode = () => setThemeMode(themeMode === 'light' ? 'dark' : 'light');

  const theme = createTheme({
    palette: {
      mode: themeMode,
      primary: { main: '#c30082', light: '#ffe7f7', contrastText: '#fff' },
      tertiary: { main: '#8200c3', light: '#f7e7ff', contrastText: '#fff' },
      secondary: { main: '#0042c3', light: '#e7efff', contrastText: '#fff' },
      text: themeMode === 'light' ? {
        veryDark: '#000',
        dark: '#080b11',
        primary: '#21242a',
        subtitle: '#222',
        medium: '#6f7780',
        faded: '#adb4be',
        hoverFaded: '#939aa3'
      } : {
        veryDark: '#000',
        dark: '#080b11',
        primary: '#f3f5f7',
        subtitle: '#222',
        medium: '#6f7780',
        faded: '#adb4be',
        hoverFaded: '#939aa3'
      },
      background: {
        default: themeMode === 'light' ? '#fff' : '#121212',
        paper: themeMode === 'light' ? '#f3f5f7' : '#1e1e1e',
        lightCard: '#f3f5f7',
        cardBorder: '#e2e6ed',
        linkHover: '#f0f2f5'
      }
    },
    typography: {
      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
      logoFont: '"Quantico", sans-serif'
    }
  });

  return (
    <ThemeContext.Provider value={{ themeMode, toggleThemeMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
