import { Box, Container, ImageList, ImageListItem } from '@mui/material';
import { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import API from 'core/services/API';
import { IPhoto } from 'shared/interfaces/photo.interface';
import { useAppDispatch, useAppSelector } from 'shared/hooks/redux-hooks';
import { retrieveAlbum } from 'shared/store/Album/albumSlice';

const Album = (): JSX.Element => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState<IPhoto[]>([]);
  const dispatch = useAppDispatch();
  const album = id && useAppSelector((store) => store.album.data.find(item => item.id === +id));

  useEffect(() => {
    if (id) {
      dispatch(retrieveAlbum([+id]));
    }
  }, []);

  useEffect(() => {
    if (album) {
      setIsLoading(true);
      API.get<IPhoto>(`/api/photos${album.photos.length > 0 ? `?ids=${album.photos.join()}` : ''}`)
        .then((res) => {
          if (Array.isArray(res)) {
            setData(res);
            setIsLoading(false);
          }
        })
        .catch(err => setError(err));

    }
  }, [album]);

  return (
    <Container disableGutters>
      {isLoading && (<Box>Loading...</Box>)}
      {error && <Box> {error}</Box>}
      {!isLoading && !error && data.length && (
        <Box>
          <ImageList cols={8} gap={8}>
            {data.map((item) => (
              <ImageListItem key={item.id}>
                <img src={`data:image/jpeg;base64,${item.image}`} alt={item.description} />
              </ImageListItem>
            ))}
          </ImageList>
        </Box>)}
    </Container>
  );
};

export { Album };
