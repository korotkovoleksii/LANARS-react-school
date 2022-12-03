import { useEffect } from 'react';
import { useAppDispatch } from 'shared/hooks/redux-hooks';
import { retrievePhotos } from 'shared/store/Photos/photoSlice';
const App = (): JSX.Element => {
  const dispatch = useAppDispatch();

  useEffect(()=>{
    dispatch(retrievePhotos());
  },[]);
  return <div className="App"></div>;
};

export default App;
