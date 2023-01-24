/* eslint-disable @typescript-eslint/naming-convention */
import { useState } from 'react';
import {
  Box,
  Checkbox,
  Container,
  Dialog,
  IconButton,
  ImageList,
  ImageListItem,
  // ImageListItemBar,
  styled,
  Typography,
} from '@mui/material';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import StarIcon from '@mui/icons-material/Star';
import { useAppDispatch, useAppSelector } from 'shared/hooks/redux-hooks';
import { IPhoto } from 'shared/interfaces/photo.interface';
import { addToSelectedPhotos, removeFromSelectedPhotos, toggleIsShow } from 'shared/store/SelectedPhotos/selectedPhotosSlice';
import { colors } from 'styles/variables';
import { updatePhoto } from 'shared/store/Photos/photoSlice';

const StyledIconButton = styled(IconButton)({
  width: '64px',
  height: '64px',
  zIndex: 1,
  color: colors.light.iconWhite,
  backgroundColor: colors.light.navigateBtn,
  position: 'fixed',
  '&:hover': {
    backgroundColor: colors.light.navigateBtn,
  },

});

const ShowPhotosGrid = ({ photos, cols = 6 }: { photos: IPhoto[]; cols?: number }): JSX.Element => {
  const selectedPhoto = useAppSelector((state) => state.selectedPhotos.data);
  const [isShowPhoto, setIsShowPhoto] = useState(false);
  const [selectedIndexPhoto, setSelectedIndexPhoto] = useState<number>(0);
  const dispatch = useAppDispatch();

  return (
    <>
      {
        photos.length !== 0 ? (
          <>
            <Box>
              <ImageList gap={8} cols={cols}>
                {photos.map((item, index) => (

                  <ImageListItem key={item.id} sx={{
                    backgroundColor: '#1D8CF41F',
                    '& .MuiImageListItem-img': {
                      transform: selectedPhoto.find((selectedItem) => selectedItem.id === item.id) ? 'scale(77%, 77%)' : 'none',
                      transition: 'transform 0.05s',
                    },
                    '&:hover': {
                      '& .MuiCheckbox-root': {
                        display: 'block',
                      },
                    },
                    cursor: 'pointer',

                  }}
                  >
                    <Checkbox
                      sx={{
                        backgroundColor: 'transparent',
                        zIndex: 1,
                        right: 0,
                        top: 0,
                        position: 'absolute',
                        display: selectedPhoto.find((selectedItem) => selectedItem.id === item.id) ? 'block' : 'none',
                      }}
                      checked={!!selectedPhoto.find((selectedItem) => selectedItem.id === item.id)}
                      onClick={() => {
                        dispatch(toggleIsShow(true));
                        dispatch(selectedPhoto.find((selectedItem) => selectedItem.id === item.id) ?
                          removeFromSelectedPhotos(item) : addToSelectedPhotos(item));
                      }} />
                    <img
                      onClick={() => {
                        setSelectedIndexPhoto(index);
                        setIsShowPhoto(true);
                      }}
                      src={`data:image/jpeg;base64,${item.image}`} alt={item.description} />

                  </ImageListItem>))}
              </ImageList>
            </Box>

            <Dialog
              open={isShowPhoto}
              fullScreen
              onClose={() => setIsShowPhoto(false)}
            >
              <Box sx={{
                backgroundColor: colors.light.bgShowPhoto,
                height: '100%',
                width: '100&',
                position: 'relative',
              }}
              >
                <Container disableGutters>
                  <Box sx={{
                    display: 'flex',
                    zIndex: 1,
                    position: 'absolute',
                    width: '100%',
                    alignItems: 'center',
                    flexGrow: 1,
                    height: '64px',
                    justifyContent: 'space-between',
                  }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <IconButton sx={{ color: colors.light.iconWhite }}
                        onClick={() => { setIsShowPhoto(false); }}
                      >
                        <ArrowBackIcon />
                      </IconButton >
                    </Box>

                    <IconButton
                      sx={{
                        color: colors.light.iconWhite,
                      }}
                      onClick={() => {
                        const photo = photos[selectedIndexPhoto];
                        dispatch(updatePhoto({ ...photo, isFavorite: !photo.isFavorite }));
                      }
                      }
                    >
                      {photos[selectedIndexPhoto].isFavorite ? (<StarIcon />) : (<StarBorderOutlinedIcon />)}
                    </IconButton>
                  </Box >

                  <StyledIconButton
                    disabled={selectedIndexPhoto === 0}
                    sx={{ top: '50%', left: '40px' }}
                    onClick={() => { setSelectedIndexPhoto(selectedIndexPhoto - 1); }}
                  >
                    <NavigateBeforeIcon />
                  </StyledIconButton>

                  <StyledIconButton
                    disabled={selectedIndexPhoto === photos.length - 1}
                    sx={{ top: '50%', right: '40px' }}
                    onClick={() => { setSelectedIndexPhoto(selectedIndexPhoto + 1); }}
                  >
                    <NavigateNextIcon />
                  </StyledIconButton>

                  <Box component={'img'}
                    src={`data:image/jpeg;base64,${photos[selectedIndexPhoto].image}`}
                    alt={photos[selectedIndexPhoto].description} sx={{
                      position: 'fixed',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                    }} />
                </Container>
              </Box>
            </Dialog >
          </>
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
      }
    </>);
};

export default ShowPhotosGrid;
