import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import { appTheme } from '../styles/appTheme';
import { Favorite, MainPage, SelectPhotos } from 'modules/pages';
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
            <Route path={Endpoints.Favorites} element={<Favorite />} />
          </Route>
          <Route path={`${Endpoints.Album}/:id`} element={<Album />} />
          <Route path={`${Endpoints.AddPhoto}/:id`} element={<SelectPhotos />} />
        </Routes>
      </ThemeProvider>
    </Box>
  );
};

export default App;
