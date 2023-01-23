import { Box, Typography } from '@mui/material';
import { Status } from 'shared/helpers/statusRequestRTK';
import { useAppSelector } from 'shared/hooks/redux-hooks';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import { colors } from 'styles/variables';
import ShowPhotosGrid from 'modules/components/ShowPhotosGrid';

const Favorite = (): JSX.Element => {

  const favoritePhoto = useAppSelector((state) => ({
    error: state.photo.error,
    data: state.photo.data.filter((item) => (item.isFavorite)),
    status: state.photo.status,
  }));

  return (
    <>
      {favoritePhoto.status === Status.Finished ? (
        favoritePhoto.data.length !== 0 ? (
          <Box>
            <ShowPhotosGrid photos={favoritePhoto.data} ></ShowPhotosGrid>
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
              }} />
            <Typography variant="subtitle1" component={'div'} sx={{ textAlign: 'center', color: colors.light.textSecondary }}>
              There are no photos yet. Please <br /> click{' '}
              <Typography variant="subtitle2" component="span">
                Upload photo
              </Typography>{' '}
              to add
            </Typography>
          </Box>
        )
      ) : (
        <Box></Box>
      )}
    </>
  );
};

export { Favorite };
