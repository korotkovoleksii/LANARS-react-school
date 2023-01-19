import { Box, Fab, Typography, ImageList, ImageListItem } from '@mui/material';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import { ChangeEvent, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from 'shared/hooks/redux-hooks';
import { colors } from 'styles/variables';
import { clearPhotos, createPhoto, retrievePhotos } from 'shared/store/Photos/photoSlice';
import { Status } from 'shared/helpers/statusRequestRTK';
import { toBase64, getBase64StringFromDataURL } from 'shared/helpers/toolsBase64';

const AllPhoto = (): JSX.Element => {
  const allPhotos = useAppSelector((state) => state.photo);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(retrievePhotos([]));
    return () => {
      dispatch(clearPhotos());
    };
  }, [dispatch]);

  const onImageChange = (ev: ChangeEvent<HTMLInputElement>) => {
    if (ev.target.files) {
      const arr = Array.from(ev.target.files);
      arr.forEach(async (item) => {
        const result = await toBase64(item);
        const base64 = getBase64StringFromDataURL(result as string);
        dispatch(createPhoto({ date: item.lastModified, description: 'def', image: base64, size: item.size, type: item.type }));
      });
    }
  };

  return (
    <>
      {allPhotos.status === Status.Finished ? (
        allPhotos.data.length !== 0 ? (
          <Box>
            <ImageList gap={8} cols={6}>
              {allPhotos.data.map((item) => (
                <ImageListItem key={item.id}>
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
              }}
            />
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
      )}

      <Fab variant="extended" size="medium" component="label">
        <FileUploadOutlinedIcon sx={{ mr: 1 }} />
        Upload photo
        <input hidden accept="image/png, image/jpeg, image/webp" multiple type="file" onChange={onImageChange} />
      </Fab>
    </>
  );
};

export { AllPhoto };
