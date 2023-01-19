import { Box, Container, Divider } from '@mui/material';
import { colors } from 'styles/variables';

const PageTemplate = ({ header, body }: { header: JSX.Element; body: JSX.Element }): JSX.Element => {
  return (
    <Box>
      <Container disableGutters>
        <Box sx={{ height: 64 }}>
          {header}
        </Box>
      </Container>
      <Divider sx={{ bgcolor: colors.light.divider, borderColor: colors.light.divider }} />
      <Container disableGutters>
        {body}
      </Container>
    </Box>
  );
};

export default PageTemplate;
