// import PhotoOutlinedIcon from '@mui/icons-material/PhotoOutlined';
import PhotoAlbumOutlinedIcon from '@mui/icons-material/PhotoAlbumOutlined';
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';
import CropOriginalOutlinedIcon from '@mui/icons-material/CropOriginalOutlined';

export const mainSideMenuItem = [
  {
    id: 0,
    icon: <CropOriginalOutlinedIcon />,
    label: 'All photos',
    route: '',
  },
  {
    id: 1,
    icon: <PhotoAlbumOutlinedIcon />,
    label: 'Albums',
    route: 'albums',
  },
  {
    id: 2,
    icon: <StarOutlineOutlinedIcon />,
    label: 'Favorites',
    route: 'favorites',
  },
];
