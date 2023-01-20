import { IPhoto } from 'shared/interfaces/photo.interface';

export { };

export const isPhoto = (obj: any): obj is IPhoto => {
  return 'date' in obj && 'description' in obj && 'id' in obj && 'image' in obj && 'size' in obj && 'type' in obj;
};
