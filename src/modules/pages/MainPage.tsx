import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Header from 'modules/components/Header';
import SideMenu from 'modules/components/SideMenu';
import PageTemplate from 'modules/components/PageTemplate';

const MainPage = (): JSX.Element => {
  const body = (
    <Box sx={{ display: 'flex', height: 'calc(100vh - 65px)', pt: 3 }}>
      <SideMenu />
      <Box sx={{ width: '100%', display: 'flex' }}>
        <Outlet />
      </Box>
    </Box>);
  return (
    <>
      <PageTemplate header={<Header />} body={body}></PageTemplate>

    </>);
};

export { MainPage };
