import { Box, Divider, CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { appTheme } from '../styles/appTheme';
import Header from 'modules/components/Header';
import { colors } from 'styles/variables';

const App = (): JSX.Element => {
  return (
    <Box>
      <ThemeProvider theme={appTheme}>
        <CssBaseline />
        <Header />
        <Divider sx={{ bgcolor: colors.light.divider }} />
      </ThemeProvider>
    </Box>
  );
};

export default App;
