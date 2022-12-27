/* eslint-disable @typescript-eslint/naming-convention */
import { createTheme } from '@mui/material/styles';
import { colors } from './variables';

export const appTheme = createTheme({
  palette: {
    mode: 'light',

    text: {
      primary: colors.light.textPrimary,
      secondary: colors.light.textSecondary,
    },
    background: { default: colors.light.background },
  },
  typography: {
    fontFamily: ['Saira', 'sans-serif'].join(','),
    h6: {
      fontWeight: 500,
      fontSize: 22,
      letterSpacing: 0.2,
    },
  },
});
