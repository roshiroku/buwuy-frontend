import { createContext, useContext } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { useAuth } from './AuthProvider';
import '@fontsource-variable/inter';
import '@fontsource/quantico';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export default ({ children }) => {
  const { settings, setSettings } = useAuth();
  const themeMode = settings.theme?.mode || 'light';
  const setThemeMode = (mode) => setSettings({ ...settings, theme: { ...settings.theme, mode } });
  const toggleThemeMode = () => setThemeMode(themeMode === 'light' ? 'dark' : 'light');

  const theme = createTheme({
    palette: {
      mode: themeMode,
      primary: { main: '#c30082', light: '#ffe7f7', contrastText: '#fff' },
      tertiary: { main: '#8200c3', light: '#f7e7ff', contrastText: '#fff' },
      secondary: { main: '#0042c3', light: '#e7efff', contrastText: '#fff' },
      link: { main: themeMode === 'light' ? '#00000000' : '#ffffffff' },
      text: themeMode === 'light' ? {
        veryDark: '#000',
        dark: '#080b11',
        header: '#080b11',
        primary: '#21242a',
        subtitle: '#222',
        medium: '#6f7780',
        faded: '#adb4be',
        hoverFaded: '#939aa3'
      } : {
        veryDark: '#000',
        dark: '#080b11',
        header: '#fafcfe',
        primary: '#f3f5f7',
        subtitle: '#222',
        medium: '#adb4be',
        faded: '#939aa3',
        hoverFaded: '#6f7780'
      },
      background: {
        default: themeMode === 'light' ? '#fff' : '#000',
        paper: themeMode === 'light' ? '#f3f5f7' : '#06080a',
        contrast: themeMode === 'light' ? '#080b11' : '#fafcfe',
        lightCard: '#f3f5f7',
        cardBorder: themeMode === 'light' ? '#e2e6ed' : '#14181f',
        linkHover: '#f0f2f5'
      }
    },
    typography: {
      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
      logoFont: '"Quantico", sans-serif'
    },
    components: {
      MuiCard: {
        elevation: 0,
        sx: {
          borderRadius: 3,
          borderWidth: 1,
          borderColor: 'background.cardBorder',
          borderStyle: 'solid'
        }
      }
    }
  });

  return (
    <ThemeContext.Provider value={{ theme, themeMode, toggleThemeMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
