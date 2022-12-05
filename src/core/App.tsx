import { useEffect } from 'react';
import { useAppDispatch } from 'shared/hooks/redux-hooks';
import { IPhoto } from 'shared/interfaces/photo.interface';
import { retrievePhotos,deletePhoto,createPhoto  } from 'shared/store/Photos/photoSlice';
// import { retrieveAlbum,deleteAlbum} from 'shared/store/Album/albumSlice';

const App = (): JSX.Element => {
  const dispatch = useAppDispatch();

  useEffect(()=>{
    // dispatch(retrievePhotos());
    dispatch(retrievePhotos());

  },[]);
  const handlerClickDelete =(): void=>{
    dispatch(deletePhoto(44));
  };
  const handlerClickUpdate = (): void=>{

  };
  const handlerClickCreate =(): void=>{

    const someVal: Omit<IPhoto,'id'> = {
      date: 'qqqqq',
      description: 'qqqq',
      image: 'qqqq',
      size: 1,
      type: 'qqqq',
    };
    dispatch(createPhoto(someVal));
  };
  return <div className="App">
    <button onClick={handlerClickDelete}>delete photo id44
    </button>
    <button onClick={handlerClickCreate}>create photo</button>
    <button onClick={handlerClickUpdate}>update photo</button>;
         </div>;


};

export default App;
