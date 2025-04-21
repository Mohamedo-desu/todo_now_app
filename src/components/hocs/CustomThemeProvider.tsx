import { ThemeProvider as NavigationThemeProvider } from '@react-navigation/native';
import { PropsWithChildren, useEffect, useMemo } from 'react';
import { useColorScheme } from 'react-native';
import { SystemBars } from 'react-native-edge-to-edge';
import { UnistylesRuntime } from 'react-native-unistyles';
import { customDarkTheme, customLightTheme } from '../../../unistyles';
import { useSettingsStore } from '@/store/settingsStore';

const CustomThemeProvider = ({ children }: PropsWithChildren) => {
  const theme = useSettingsStore(state => state.theme);
  const colorScheme = useColorScheme();

  const useSystemTheme = theme === 'system';

  // Determine which theme to apply and configure adaptive behavior
  const selectedTheme: any = useMemo(() => {
    const appliedTheme = useSystemTheme ? colorScheme : theme;

    UnistylesRuntime.setAdaptiveThemes(useSystemTheme);
    return appliedTheme;
  }, [theme, colorScheme, useSystemTheme]);

  // Only set theme and background when a non-system theme is active
  useEffect(() => {
    if (!useSystemTheme) {
      UnistylesRuntime.setTheme(selectedTheme);
    }
  }, [selectedTheme, useSystemTheme]);

  // Prepare navigation theme based on selected theme
  const currentNavigationTheme = useMemo(
    () => (selectedTheme === 'dark' ? customDarkTheme : customLightTheme),
    [selectedTheme]
  );

  return (
    <NavigationThemeProvider value={currentNavigationTheme}>
      {children}

      <SystemBars style={selectedTheme === 'dark' ? 'light' : 'dark'} />
    </NavigationThemeProvider>
  );
};

export default CustomThemeProvider;
