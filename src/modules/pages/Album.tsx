/* eslint-disable @typescript-eslint/naming-convention */
import { Box, Button, Container, IconButton, ImageList, ImageListItem, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { IPhoto } from 'shared/interfaces/photo.interface';
import { useAppDispatch } from 'shared/hooks/redux-hooks';
import { retrieveAlbum } from 'shared/store/Album/albumSlice';
import PhotoAlbumOutlinedIcon from '@mui/icons-material/PhotoAlbumOutlined';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { colors } from 'styles/variables';
import Endpoints from 'shared/constants/endpoints';
import { IAlbum } from 'shared/interfaces/album.interface';
import { retrievePhotos } from 'shared/store/Photos/photoSlice';

const Album = (): JSX.Element => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [album, setAlbum] = useState<IAlbum>();
  const [data, setData] = useState<IPhoto[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      dispatch(retrieveAlbum([+id])).unwrap().then((res) => Array.isArray(res) ? setAlbum(res[0]) : setAlbum(res));
    }
  }, []);
  useEffect(() => {
    if (album) {
      setIsLoading(true);
      dispatch(retrievePhotos(album.photos))
        .unwrap()
        .then((res) => {
          setData(Array.isArray(res) ? res : [res]);
        })
        .catch(() => setHasError(true))
        .finally(() => setIsLoading(false));

    }
  }, [album]);

  return (
    <>
      {!isLoading && !hasError && album && (
        <Container disableGutters sx={{ height: '100%', minHeight: '100%' }}>
          <Box sx={{
            height: '65px',
            display: 'flex',
            alignItems: 'center',

          }}
          >
            <IconButton sx={{ mr: 2 }} onClick={() => navigate(Endpoints.Albums)}>
              <ArrowBackIcon />
            </IconButton >

            <TextField variant="standard" value={album && album.title} sx={{
              width: '769px',
              mr: '120px',
              '& :before': {
                borderColor: colors.light.iconNoPhotoYet,
              },
            }} />

            <Button
              startIcon={<AddPhotoAlternateOutlinedIcon />}
              component={Link}
              to={`${Endpoints.AddPhoto}/${album.id}`}
            >
              ADD PHOTO
            </Button>
          </Box >

          {hasError && <Box> {hasError}</Box>}
          {
            !isLoading && !hasError && !!data.length && (
              <Box>
                <ImageList cols={8} gap={8}>
                  {data.map((item) => (
                    <ImageListItem key={item.id}>
                      <img src={`data:image/jpeg;base64,${item.image}`} alt={item.description} />
                    </ImageListItem>
                  ))}
                </ImageList>
              </Box>)
          }
          {
            !isLoading && !hasError && !data.length && (
              <Box sx={{ display: 'flex', height: 'calc(100vh - 65px)' }}>
                <Box sx={{
                  display: 'flex',
                  flexGrow: 1,
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                >
                  <PhotoAlbumOutlinedIcon sx={{
                    fontSize: 165,
                    color: colors.light.iconNoPhotoYet,
                    mb: 1,
                  }} />
                  <Typography variant="body2" component="div" sx={{
                    color: colors.light.textSecondary,
                    mb: 4,
                  }}
                  >
                    Album is empty
                  </Typography>
                  <Button
                    component={Link}
                    startIcon={<AddPhotoAlternateOutlinedIcon />}
                    to={`${Endpoints.AddPhoto}/${album.id}`}
                  >ADD PHOTO
                  </Button>

                </Box >
              </Box>
            )
          }
        </Container >)}
    </>
  );
};

export { Album };
