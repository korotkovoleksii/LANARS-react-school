/* eslint-disable @typescript-eslint/naming-convention */
import { Box, Checkbox, ImageList, ImageListItem, ImageListItemBar, Typography } from '@mui/material';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import { useDispatch } from 'react-redux';
import { Status } from 'shared/helpers/statusRequestRTK';
import { useAppSelector } from 'shared/hooks/redux-hooks';
import { IPhoto } from 'shared/interfaces/photo.interface';
import { IDataSlice } from 'shared/interfaces/slice.interface';
import { addToSelectedPhotos, removeFromSelectedPhotos, toggleIsShow } from 'shared/store/SelectedPhotos/selectedPhotosSlice';
import { colors } from 'styles/variables';

const ShowPhotosGrid = ({ photo }: { photo: IDataSlice<IPhoto> }): JSX.Element => {
  const selectedPhoto = useAppSelector((state) => state.selectedPhotos.data);
  const dispatch = useDispatch();
  return (
    <>{
      photo.status === Status.Finished ? (
        photo.data.length !== 0 ? (
          <Box>
            <ImageList gap={8} cols={6}>
              {photo.data.map((item) => (
                <ImageListItem key={item.id} sx={{
                  '&:hover': {
                    '& .MuiImageListItemBar-root': {
                      display: 'flex',
                    },

                  },
                }}
                >
                  <ImageListItemBar
                    sx={{
                      backgroundColor: 'transparent',
                      display: selectedPhoto.find((selectedItem) => selectedItem.id === item.id) ? 'flex' : 'none',
                    }}
                    position="top"
                    actionIcon={
                      <Checkbox checked={!!selectedPhoto.find((selectedItem) => selectedItem.id === item.id)} onClick={() => {
                        dispatch(toggleIsShow(true));
                        dispatch(selectedPhoto.find((selectedItem) => selectedItem.id === item.id) ?
                          removeFromSelectedPhotos(item) : addToSelectedPhotos(item));
                      }} />
                    }
                    actionPosition="right" />

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
      )
    }
    </>);
};

export default ShowPhotosGrid;
