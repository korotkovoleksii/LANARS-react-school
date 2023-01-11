import { Box, Fab, Typography, ImageList, ImageListItem } from '@mui/material';
import { useAppSelector, useAppDispatch } from 'shared/hooks/redux-hooks';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import { colors } from 'styles/variables';
import { useEffect } from 'react';
import { clearPhotos, retrievePhotos } from 'shared/store/Photos/photoSlice';

const AllPhoto = (): JSX.Element => {
  const allPhotos = useAppSelector((state) => state.photo);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(retrievePhotos([]));
    return () => {
      dispatch(clearPhotos());
    };
  }, [dispatch]);
  return (
    <>
      {allPhotos.data.length !== 0 && allPhotos.status === 'finished' ? (
        <Box>
          <ImageList gap={8} cols={6}>
            {allPhotos.data.map((item) => (
              <ImageListItem key={item.id}>
                <img src={`data:image/jpeg;base64,${item.image}`} alt={item.description} />
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexGrow: 1,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ImageOutlinedIcon
            sx={{
              fontSize: 160,
              color: colors.light.iconNoPhotoYet,
            }}/>
          <Typography variant="subtitle1" component={'div'} sx={{ textAlign: 'center', color: colors.light.textSecondary }}>
            There are no photos yet. Please <br /> click{' '}
            <Typography variant="subtitle2" component="span">
              Upload photo
            </Typography>{' '}
            to add
          </Typography>
        </Box>
      )}

      <Fab variant="extended" size="medium">
        <FileUploadOutlinedIcon sx={{ mr: 1 }} />
        Upload photo
      </Fab>
    </>
  );
};

export { AllPhoto };
