import { Typography, Box, Grid, Stack } from '@mui/material';
import { Container } from '@mui/system';
import logo from '../../../assets/icons/logo.svg';

const Header = (): JSX.Element => {
  return (
    <Box
      sx={{
        pt: 2,
        pb: 1,
      }}
    >
      <Container disableGutters>
        <Grid container>
          <Grid item xs={2}>
            <Stack direction="row" spacing={2} alignItems={'center'}>
              <Box
                component="img"
                sx={{
                  height: 40,
                  width: 40,
                }}
                src={logo}
                alt="Logo"
              />
              <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'theme.palette.text.primary' }}>
                React School
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={10}></Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Header;
