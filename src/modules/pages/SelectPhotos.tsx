
import { Button, IconButton, ImageList, ImageListItem, Typography, Checkbox, ImageListItemBar } from '@mui/material';
import { Box } from '@mui/system';
import PageTemplate from 'modules/components/PageTemplate';
import { useNavigate, useParams } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import { useAppDispatch } from 'shared/hooks/redux-hooks';
import { colors } from 'styles/variables';
import { ChangeEvent, useEffect, useState } from 'react';
import { IFABProp } from 'shared/interfaces/selectPhotos.interface';
import { getBase64StringFromDataURL, toBase64 } from 'shared/helpers/toolsBase64';
import { IPhoto } from 'shared/interfaces/photo.interface';
import { createPhoto, retrievePhotos } from 'shared/store/Photos/photoSlice';
import Endpoints from 'shared/constants/endpoints';
import { retrieveAlbum, updateAlbum } from 'shared/store/Album/albumSlice';
import { IAlbum } from 'shared/interfaces/album.interface';

const SelectPhotos = (): JSX.Element => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [selectedPhotoId, setSelectedPhotoId] = useState<number[]>([]);
  const [album, setAlbum] = useState<IAlbum>();
  const [allPhotos, setAllPhotos] = useState<IPhoto[]>([]);

  const handleClickDone = () => {
    if (album) {
      // add photo in album and check if photo exist in album
      dispatch(updateAlbum({
        ...album,
        photos: [...album.photos, ...selectedPhotoId.filter((item) => !album.photos.includes(item))],
      })).unwrap().then(() => {
        navigate(`${Endpoints.Album}/${id}`);
      });
    }
  };

  const onImageChange = (ev: ChangeEvent<HTMLInputElement>) => {
    if (ev.target.files) {
      const arr = Array.from(ev.target.files);
      const p = arr.map(async (item) => {
        const result = await toBase64(item);
        const base64 = getBase64StringFromDataURL(result as string);
        const newPhoto: Omit<IPhoto, 'id'> = {
          date: item.lastModified,
          description: 'def',
          image: base64,
          size: item.size,
          type: item.type,
          isFavorite: false,
        };
        return dispatch(createPhoto(newPhoto)).unwrap();
      });

      Promise.allSettled(p).then((result) => {
        const resultPhoto: IPhoto[] = [];
        result.forEach((item) => {
          if (item.status === 'fulfilled') {
            resultPhoto.push(item.value);
          }
        });
        setSelectedPhotoId([...selectedPhotoId, ...resultPhoto.map(item => item.id)]);
        setAllPhotos([...allPhotos, ...resultPhoto]);
      });
    }
  };

  const fabProps: IFABProp = { title: 'SELECT FILES FROM COMPUTER', handlerChange: onImageChange };
  const header = (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      flexGrow: 1,
      justifyContent: 'space-between',

    }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <IconButton onClick={() => navigate(`${Endpoints.Album}/${id}`)}>
          <CloseIcon />
        </IconButton >
        <Typography
          variant="body2"
          component="div"
          sx={{ color: colors.light.textPrimary, fontSize: 22, fontWeight: 400 }}
        >
          {!selectedPhotoId.length ? 'Add to album' :
            selectedPhotoId.length === 1 ? `Selected ${selectedPhotoId.length} photo` : `Selected ${selectedPhotoId.length} photos`}
        </Typography>
      </Box>
      <Button variant="contained" disabled={!selectedPhotoId.length} onClick={handleClickDone}>Done</Button>
    </Box >
  );
  const body = (
    <Box>
      <ImageList cols={8} gap={8}>
        {allPhotos.map((item) => (
          <ImageListItem key={item.id} onClick={() => {
            setSelectedPhotoId(selectedPhotoId.includes(item.id) ?
              selectedPhotoId.filter(itemId => itemId !== item.id) : [...selectedPhotoId, item.id]);
          }}
          >
            <ImageListItemBar
              sx={{
                backgroundColor: 'transparent',
              }}
              position="top"
              actionIcon={
                <Checkbox checked={selectedPhotoId.includes(item.id)} />
              }
              actionPosition="right" />
            <img src={`data:image/jpeg;base64,${item.image}`} alt={item.description} />
          </ImageListItem>
        ))}
      </ImageList>
    </Box >
  );

  useEffect(() => {
    if (id) {
      dispatch(retrieveAlbum([+id])).unwrap().then((res) => Array.isArray(res) ? setAlbum(res[0]) : setAlbum(res));
      dispatch(retrievePhotos([])).unwrap().then((res) => Array.isArray(res) ? setAllPhotos(res) : setAllPhotos([res]));
    }
  }, []);

  return (
    <Box>
      {<PageTemplate header={header} body={body} fab={fabProps}></PageTemplate>}
    </Box >
  );
};

export { SelectPhotos };
