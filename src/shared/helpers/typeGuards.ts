import { IPhoto } from 'shared/interfaces/photo.interface';

export { };

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const isPhoto = (obj: any): obj is IPhoto => {
  return 'date' in obj && 'description' in obj && 'id' in obj && 'image' in obj && 'size' in obj && 'type' in obj && 'isFavorite' in obj;
};
