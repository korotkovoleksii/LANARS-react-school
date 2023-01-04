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
    subtitle1: {
      fontWeight: 400,
      fontSize: 16,
      letterSpacing: 0.2,
    },
    subtitle2: {
      fontWeight: 600,
      fontSize: 16,
      letterSpacing: 0.2,
    },
  },
  components: {
    MuiFab: {
      styleOverrides: {
        root: {
          borderRadius: '4px',
          backgroundColor: colors.light.fabBtnBG,
          color: colors.light.fabBtnText,
          position: 'absolute',
          right: '0px',
          bottom: '40px',
          ':hover': {
            backgroundColor: colors.light.fabBtnBGHover,
          },
          '&.Mui-disabled': {
            backgroundColor: colors.light.fabBtnBGDisabled,
            color: colors.light.fabBtnTextDisabled,
          },
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          position: 'relative',
        },
      },
    },
    MuiImageListItem: {
      styleOverrides: {
        root: {
          '& .MuiImageListItem-img': {
            borderRadius: '8px',
            height: '142px',
            width: '142px',
          },
        },
      },
    },
  },
});
