import Theme from 'types/Theme';
import { useTheme as useThemeHook } from '@emotion/react';

const useTheme = () => {
  const theme = useThemeHook() as Theme;
  return theme;
};

export default useTheme;
