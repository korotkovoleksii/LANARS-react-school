import { Box, Divider, CssBaseline, Container, ThemeProvider } from '@mui/material';
import { Route, Routes } from 'react-router-dom';

import Header from 'modules/components/Header';
import SideMenu from 'modules/components/SideMenu';
import { appTheme } from '../styles/appTheme';
import { colors } from 'styles/variables';
import { AllPhoto, Albums } from 'modules/pages';
import Endpoints from 'shared/constants/endpoints';
import { Stack } from '@mui/system';

const App = (): JSX.Element => {
  return (
    <Box>
      <ThemeProvider theme={appTheme}>
        <CssBaseline />
        <Header />
        <Divider sx={{ bgcolor: colors.light.divider }} />
        <Container>
          <Stack direction={'row'}>
            <SideMenu />
            <Box sx={{ height: '100vh', width: '100%' }}>
              <Routes>
                <Route path={Endpoints.AllPhoto} element={<AllPhoto />} />
                <Route path={Endpoints.Albums} element={<Albums />} />
              </Routes>
            </Box>
          </Stack>
        </Container>
      </ThemeProvider>
    </Box>
  );
};

export default App;
