/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, IconButton, ImageList, ImageListItem, Typography, Checkbox } from '@mui/material';
import { Box } from '@mui/system';
import PageTemplate from 'modules/components/PageTemplate';
import { useNavigate, useParams } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import { useAppSelector } from 'shared/hooks/redux-hooks';
import { colors } from 'styles/variables';
import { IPhoto } from 'shared/interfaces/photo.interface';
import { useState } from 'react';


const SelectPhotos = (): JSX.Element => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedPhotoId, setSelectedPhotoId] = useState<number[]>([]);
  const allPhotos = useAppSelector((state) => state.photo);

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
          Add to album
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
      {<PageTemplate header={header} body={body}></PageTemplate>}
      <Box> Select Photo for add to album {id}</Box>
    </Box>


  );
};

export { SelectPhotos };
