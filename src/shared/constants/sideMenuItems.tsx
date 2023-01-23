import PhotoAlbumOutlinedIcon from '@mui/icons-material/PhotoAlbumOutlined';
import CropOriginalOutlinedIcon from '@mui/icons-material/CropOriginalOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import Endpoints from 'shared/constants/endpoints';

export const mainSideMenuItem = [
  {
    id: 0,
    icon: <CropOriginalOutlinedIcon />,
    label: 'All photos',
    route: Endpoints.AllPhoto,
  },
  {
    id: 1,
    icon: <PhotoAlbumOutlinedIcon />,
    label: 'Albums',
    route: Endpoints.Albums,
  },
  {
    id: 2,
    icon: <StarBorderOutlinedIcon />,
    label: 'Favorites',
    route: Endpoints.Favorites,
  },
];
