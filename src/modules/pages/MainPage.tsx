import { Box, Divider, Container } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Header from 'modules/components/Header';
import SideMenu from 'modules/components/SideMenu';

import { colors } from 'styles/variables';
// import { AllPhoto, Albums } from 'modules/pages';
// import Endpoints from 'shared/constants/endpoints';
const MainPage = (): JSX.Element => {

  return (
    <>
      <Header />
      <Divider sx={{ bgcolor: colors.light.divider, borderColor: colors.light.divider }} />
      <Container disableGutters>
        <Box sx={{ display: 'flex', height: 'calc(100vh - 65px)', pt: 3 }}>
          <SideMenu />
          <Box sx={{ width: '100%', display: 'flex' }}>
            <Outlet />
          </Box>
        </Box>
      </Container>
    </>);
};

export { MainPage };
