/* eslint-disable @typescript-eslint/naming-convention */
import { Box, Card, Typography, CardHeader, IconButton, CardMedia } from '@mui/material';
import { useEffect } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CropOriginalOutlinedIcon from '@mui/icons-material/CropOriginalOutlined';
import { useAppDispatch, useAppSelector } from 'shared/hooks/redux-hooks';
import { retrievePhotos } from 'shared/store/Photos/photoSlice';
import { colors } from 'styles/variables';

const AlbumCard = ({ title, idPhoto, countPhotos }: { title: string; idPhoto: number; countPhotos: number }): JSX.Element => {
  const dispatch = useAppDispatch();
  const photos = useAppSelector((store) => store.photo);

  useEffect(() => {
    dispatch(retrievePhotos([idPhoto]));
  }, [dispatch]);

  return (
    <Card
      sx={{
        width: 280,
        maxHeight: 370,
        p: 0,

        backgroundColor: 'transparent',
        boxShadow: 'none',
        position: 'relative',
        '&:hover': {
          '& .MuiIconButton-root': {
            display: 'inline-flex',
          },
        },
      }}
    >
      <CardHeader
        sx={{
          position: 'absolute',
          right: 0,
        }}
        action={
          <IconButton
            aria-label="settings"
            sx={{
              color: colors.light.fabBtnText,
              bgcolor: colors.light.fabBtnBG,
              display: 'none',
              '&:hover': {
                bgcolor: colors.light.fabBtnBG,
              },
            }}
          >
            <MoreVertIcon />
          </IconButton>
        }/>
      {photos.error===null&& photos.data.length? (
        <CardMedia
          component="img"
          height="280"
          image={`data:image/jpeg;base64,${photos.data[0].image}`}
          alt={title}
          sx={{ borderRadius: '8px' }}/>
      ) : (
        <Box
          height="280px"
          sx={{
            bgColor: colors.light.background,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            bgcolor: colors.light.background,
            borderRadius: '8px',
          }}
        >
          <CropOriginalOutlinedIcon
            sx={{
              color: colors.light.selectedBtnMenuBG,
              fontSize: 160,
            }}/>
        </Box>
      )}
      <Box sx={{mt:2}}>
        <Typography
          sx={{
            lineHeight: '24px',
            maxHeight: '72px',
            overflow: 'hidden',
            whiteSpace: 'initial',
          }}
        >
          {title}
        </Typography>
        <Typography variant="caption" sx={{mt:1}}>{countPhotos} images</Typography>
      </Box>
    </Card>
  );
};
export default AlbumCard;
