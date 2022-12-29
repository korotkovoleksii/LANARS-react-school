import { Box, Divider, CssBaseline, Container, ThemeProvider } from '@mui/material';

import Header from 'modules/components/Header';
import SideMenu from 'modules/components/SideMenu';
import { appTheme } from '../styles/appTheme';
import { colors } from 'styles/variables';

const App = (): JSX.Element => {
  return (
    <Box>
      <ThemeProvider theme={appTheme}>
        <CssBaseline />
        <Header />
        <Divider sx={{ bgcolor: colors.light.divider }} />
        <Container>
          <SideMenu />
        </Container>
      </ThemeProvider>
    </Box>
  );
};

export default App;
