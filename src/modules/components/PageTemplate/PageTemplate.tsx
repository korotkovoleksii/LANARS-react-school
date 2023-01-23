import { Box, Container, Divider, Fab } from '@mui/material';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import { IPageTemplateProps } from 'shared/interfaces/selectPhotos.interface';
import { colors } from 'styles/variables';

const PageTemplate = ({ header, body, fab }: IPageTemplateProps): JSX.Element => {
  return (
    <Box>
      <Container disableGutters>
        <Box sx={{ height: 64, display: 'flex', alignItems: 'center', width: '100%' }}>
          {header}
        </Box>
      </Container>
      <Divider sx={{ bgcolor: colors.light.divider, borderColor: colors.light.divider }} />
      <Container disableGutters>
        {body}
        {fab && (
          <Fab variant="extended" size="medium" component="label">
            <FileUploadOutlinedIcon sx={{ mr: 1 }} />
            {fab.title}
            <input hidden accept="image/png, image/jpeg, image/webp" multiple type="file" onChange={fab.handlerChange} />
          </Fab>)
        }

      </Container>

    </Box>
  );
};

export default PageTemplate;
