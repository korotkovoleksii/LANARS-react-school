import { Box, Divider, CssBaseline, Container, ThemeProvider } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import Header from 'modules/components/Header';
import SideMenu from 'modules/components/SideMenu';
import { appTheme } from '../styles/appTheme';
import { colors } from 'styles/variables';
import { AllPhoto, Albums } from 'modules/pages';
import Endpoints from 'shared/constants/endpoints';

const App = (): JSX.Element => {
  return (
    <Box>
      <ThemeProvider theme={appTheme}>
        <CssBaseline />
        <Header />
        <Divider sx={{ bgcolor: colors.light.divider }} />
        <Container disableGutters>
          <Box sx={{ display: 'flex', height: 'calc(100vh - 65px)', pt: 3 }}>
            <SideMenu />
            <Box sx={{ width: '100%', display: 'flex' }}>
              <Routes>
                <Route path={Endpoints.AllPhoto} element={<AllPhoto />} />
                <Route path={Endpoints.Albums} element={<Albums />} />
              </Routes>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </Box>
  );
};

export default App;
