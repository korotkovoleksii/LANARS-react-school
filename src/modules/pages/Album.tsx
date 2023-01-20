/* eslint-disable @typescript-eslint/naming-convention */
import { Box, Button, Container, IconButton, ImageList, ImageListItem, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from 'core/services/API';
import { IPhoto } from 'shared/interfaces/photo.interface';
import { useAppDispatch, useAppSelector } from 'shared/hooks/redux-hooks';
import { retrieveAlbum } from 'shared/store/Album/albumSlice';
import PhotoAlbumOutlinedIcon from '@mui/icons-material/PhotoAlbumOutlined';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { colors } from 'styles/variables';
import { isPhoto } from 'shared/helpers/typeGuards';

const Album = (): JSX.Element => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [data, setData] = useState<IPhoto[]>([]);
  const dispatch = useAppDispatch();

  const album = id && useAppSelector((store) => store.album.data.find(item => item.id === +id));

  useEffect(() => {
    if (id) {
      dispatch(retrieveAlbum([+id]));
    }
  }, []);
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        setHasError(false);
        if (album) {
          if (album.photos.length) {
            const res = await API.get<IPhoto>(`/api/photos${`?ids=${album.photos.join()}`}`);
            if (Array.isArray(res)) {
              setData(res);
              setIsLoading(false);
            }
            if (isPhoto(res)) {
              setData([res]);
              setIsLoading(false);
            }
          }
        }
      } catch (err) {
        setHasError(true);
      }
      finally {
        setIsLoading(false);
      }
    };
    loadData();
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
            <IconButton sx={{ mr: 2 }} onClick={() => navigate(-1)}>
              <ArrowBackIcon />
            </IconButton >

            <TextField variant="standard" value={album && album.title} sx={{
              width: '769px',
              mr: '120px',
              '& :before': {
                borderColor: colors.light.iconNoPhotoYet,
              },
            }} />
            <Button startIcon={<AddPhotoAlternateOutlinedIcon />}>ADD PHOTO</Button>
          </Box >
          {isLoading && (<Box>Loading...</Box>)}
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
                  <Button startIcon={<AddPhotoAlternateOutlinedIcon />}>ADD PHOTO</Button>

                </Box >
              </Box>
            )
          }
        </Container >)}
    </>
  );
};

export { Album };
