/* eslint-disable @typescript-eslint/naming-convention */
import { Typography, Box, Stack, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import { useAppDispatch, useAppSelector } from 'shared/hooks/redux-hooks';
import logo from '../../../assets/icons/logo.svg';
import { colors } from 'styles/variables';
import { clearSelectedPhotos, toggleIsShow } from 'shared/store/SelectedPhotos/selectedPhotosSlice';
import { updatePhoto } from 'shared/store/Photos/photoSlice';
import { useLocation } from 'react-router-dom';
import Endpoints from 'shared/constants/endpoints';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';


const Header = (): JSX.Element => {
  const { data: selectedPhoto, isShow: isSelectedInfoHederShow } = useAppSelector((state) => state.selectedPhotos);
  const { pathname } = useLocation();
  // eslint-disable-next-line no-console
  console.log(location);
  const dispatch = useAppDispatch();
  const ordinaryHeader = (
    <Stack direction="row" spacing={2} alignItems={'center'} flexGrow={1}>
      <Box
        component="img"
        sx={{
          height: 40,
          width: 40,
        }}
        src={logo}
        alt="Logo" />
      <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'theme.palette.text.primary' }}>
        React School
      </Typography>
    </Stack>);
  const selectedInfoHeader = (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      flexGrow: 1,
      justifyContent: 'space-between',
    }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <IconButton onClick={() => { dispatch(clearSelectedPhotos()); dispatch(toggleIsShow(false)); }}>
          <CloseIcon />
        </IconButton >
        <Typography
          variant="body2"
          component="div"
          sx={{ color: colors.light.textPrimary, fontSize: 22, fontWeight: 400 }}
        >
          {!selectedPhoto.length ? 'Select a photo' :
            selectedPhoto.length === 1 ? `Selected ${selectedPhoto.length} photo` : `Selected ${selectedPhoto.length} photos`}
        </Typography>
      </Box>
      <Box sx={{
        display: 'flex',
        gap: '27px',
      }}
      >
        <IconButton
          sx={{
            color: colors.light.fabBtnBG,
          }}
          disabled={!selectedPhoto.length}
          onClick={() => {
            selectedPhoto.forEach((item) => (dispatch(updatePhoto({ ...item, isFavorite: true }))));
            dispatch(clearSelectedPhotos());
            dispatch(toggleIsShow(false));
          }
          }
        >
          <StarBorderOutlinedIcon />
        </IconButton >
        {pathname === Endpoints.Favorites &&
          (
            <IconButton
              disabled={!selectedPhoto.length}
              onClick={() => {
                selectedPhoto.forEach((item) => (dispatch(updatePhoto({ ...item, isFavorite: false }))));
                dispatch(clearSelectedPhotos());
                dispatch(toggleIsShow(false));
              }}
              sx={{
                color: colors.light.fabBtnBG,
              }}

            >
              <DeleteOutlineIcon />
            </IconButton>
          )
        }
      </Box>

    </Box >);

  return (
    <>
      {selectedPhoto.length || isSelectedInfoHederShow ? (selectedInfoHeader) : (ordinaryHeader)}
    </>
  );
};

export default Header;
