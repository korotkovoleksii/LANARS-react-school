export interface IDataSlice<T> {
  status: 'idle' | 'loading' | 'finished' | 'error';
  data: T[];
  error: string | null;
}
