import { Box, Fab } from '@mui/material';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import { ChangeEvent, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'shared/hooks/redux-hooks';
import { createPhoto, retrievePhotos } from 'shared/store/Photos/photoSlice';
import { toBase64, getBase64StringFromDataURL } from 'shared/helpers/toolsBase64';
import ShowPhotosGrid from 'modules/components/ShowPhotosGrid';
import { Status } from 'shared/helpers/statusRequestRTK';
import { clearSelectedPhotos } from 'shared/store/SelectedPhotos/selectedPhotosSlice';

const AllPhoto = (): JSX.Element => {

  const dispatch = useAppDispatch();
  const allPhoto = useAppSelector((state) => state.photo);
  useEffect(() => {
    dispatch(retrievePhotos([]));
    return () => {
      dispatch(clearSelectedPhotos());
    };
  }, [dispatch]);

  const onImageChange = (ev: ChangeEvent<HTMLInputElement>) => {
    if (ev.target.files) {
      const arr = Array.from(ev.target.files);
      arr.forEach(async (item) => {
        const result = await toBase64(item);
        const base64 = getBase64StringFromDataURL(result as string);
        dispatch(createPhoto({
          date: item.lastModified,
          description: 'def',
          image: base64,
          size: item.size,
          type: item.type,
          isFavorite: false,
        }));
      });
    }
  };

  return (
    <>

      {allPhoto.status === Status.Finished ? (<ShowPhotosGrid photos={allPhoto.data}></ShowPhotosGrid>) : (<Box></Box>)}
      <Fab variant="extended" size="medium" component="label">
        <FileUploadOutlinedIcon sx={{ mr: 1 }} />
        Upload photo
        <input hidden accept="image/png, image/jpeg, image/webp" multiple type="file" onChange={onImageChange} />
      </Fab>
    </>
  );
};

export { AllPhoto };
