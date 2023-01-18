import PhotoAlbumOutlinedIcon from '@mui/icons-material/PhotoAlbumOutlined';
import { Typography, Box, Grid } from '@mui/material';
import { colors } from 'styles/variables';
import { useAppDispatch, useAppSelector } from 'shared/hooks/redux-hooks';
import { retrieveAlbum } from 'shared/store/Album/albumSlice';
import AlbumCard from 'modules/components/AlbumCard';
import { useEffect } from 'react';
import { clearPhotos } from 'shared/store/Photos/photoSlice';
import { Status } from 'shared/helpers/statusRequestRTK';

const Albums = (): JSX.Element => {
  const albums = useAppSelector((store) => store.album);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(retrieveAlbum([]));
    return () => {
      dispatch(clearPhotos());
    };
  }, [dispatch]);
  return (
    <>
      {albums.status === Status.Finished ? (
        albums.data.length === 0 ? (
          <Box
            sx={{
              display: 'flex',
              flexGrow: 1,
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <PhotoAlbumOutlinedIcon
              sx={{
                fontSize: 160,
                color: colors.light.iconNoPhotoYet,
              }}
            />
            <Typography variant="subtitle1" component={'div'} sx={{ textAlign: 'center', color: colors.light.textSecondary }}>
              There are no albums yet. Please <br /> click{' '}
              <Typography variant="subtitle2" component="span">
                Upload album
              </Typography>{' '}
              to add
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {albums.data.map((item) => {
              return (
                <Grid item key={item.id}>
                  <AlbumCard title={item.title} idPhoto={item.photos[0]} countPhotos={item.photos.length} />
                </Grid>
              );
            })}
          </Grid>
        )
      ) : (
        <Box></Box>
      )}
    </>
  );
};

export { Albums };
