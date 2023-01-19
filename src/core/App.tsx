import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
// import Header from 'modules/components/Header';
// import SideMenu from 'modules/components/SideMenu';
import { appTheme } from '../styles/appTheme';
// import { colors } from 'styles/variables';
import { MainPage } from 'modules/pages';
import { AllPhoto, Albums, Album } from 'modules/pages';
import Endpoints from 'shared/constants/endpoints';

const App = (): JSX.Element => {
  return (
    <Box>
      <ThemeProvider theme={appTheme}>
        <CssBaseline />
        <Routes>
          <Route path={Endpoints.AllPhoto} element={<MainPage />}>
            <Route path={Endpoints.AllPhoto} element={<AllPhoto />} />
            <Route path={Endpoints.Albums} element={<Albums />} />
          </Route>
          <Route path={`${Endpoints.Album}/:id`} element={<Album />} />

        </Routes>
      </ThemeProvider>
    </Box>
  );
};

export default App;
