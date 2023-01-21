import { Button, IconButton, ImageList, ImageListItem, Typography, Checkbox } from '@mui/material';
import { Box } from '@mui/system';
import PageTemplate from 'modules/components/PageTemplate';
import { useNavigate, useParams } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import { useAppDispatch, useAppSelector } from 'shared/hooks/redux-hooks';
import { colors } from 'styles/variables';
import { ChangeEvent, useState } from 'react';
import { IFABProp } from 'shared/interfaces/selectPhotos.interface';
import { getBase64StringFromDataURL, toBase64 } from 'shared/helpers/toolsBase64';
import API from 'core/services/API';
import { IPhoto } from 'shared/interfaces/photo.interface';
import { addPhotos } from 'shared/store/Photos/photoSlice';

const SelectPhotos = (): JSX.Element => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [selectedPhotoId, setSelectedPhotoId] = useState<number[]>([]);
  const allPhotos = useAppSelector((state) => state.photo);

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
        };
        const responsePhoto = await API.post('/api/photos', newPhoto) as IPhoto;
        return responsePhoto;
      });

      Promise.all(p).then(response => {
        setSelectedPhotoId([...selectedPhotoId, ...response.map(item => item.id)]);
        dispatch(addPhotos(response));
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
        <IconButton onClick={() => navigate(-1)}>
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
      <Button variant="contained" disabled={!selectedPhotoId.length}>Done</Button>
    </Box >
  );
  const body = (
    <Box>
      <ImageList cols={8} gap={8}>
        {allPhotos.data.map((item) => (
          <ImageListItem key={item.id} onClick={() => {
            setSelectedPhotoId(selectedPhotoId.includes(item.id) ?
              selectedPhotoId.filter(itemId => itemId !== item.id) : [...selectedPhotoId, item.id]);
          }}
          >
            <Checkbox checked={selectedPhotoId.includes(item.id)} sx={{ position: 'absolute', right: 0 }} />
            <img src={`data:image/jpeg;base64,${item.image}`} alt={item.description} />
          </ImageListItem>
        ))}
      </ImageList>
    </Box >
  );

  return (
    <Box>
      {<PageTemplate header={header} body={body} fab={fabProps}></PageTemplate>}
      <Box> Select Photo for add to album {id}</Box>
    </Box >
  );
};

export { SelectPhotos };
