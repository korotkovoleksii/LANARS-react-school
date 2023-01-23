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
  },
  typography: {
    fontFamily: ['Saira', 'sans-serif'].join(','),
    fontSize: 16,

    body1: { fontWeight: 500, fontSize: 16 },
    subtitle1: { fontSize: 16 },
    subtitle2: {
      fontWeight: 600,
    },
  },
  components: {
    MuiFab: {
      styleOverrides: {
        root: {
          borderRadius: '4px',
          backgroundColor: colors.light.fabBtnBG,
          color: colors.light.fabBtnText,
          position: 'fixed',
          right: '45px',
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
            maxWidth: '142px',

          },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {},
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: 'none',
          color: colors.light.primary,
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: colors.light.background,
        },
      },
    },

  },
});
