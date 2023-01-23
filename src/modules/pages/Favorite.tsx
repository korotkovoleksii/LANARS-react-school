
import { Box, ImageList, ImageListItem, Typography } from '@mui/material';
import { Status } from 'shared/helpers/statusRequestRTK';
import { useAppSelector } from 'shared/hooks/redux-hooks';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import { colors } from 'styles/variables';

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
            <ImageList gap={8} cols={6}>
              {favoritePhoto.data.map((item) => (
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
