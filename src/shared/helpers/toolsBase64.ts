export const toBase64 = (file1: Blob): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file1);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
export const getBase64StringFromDataURL = (dataURL: string): string => {
  return dataURL?.replace('data:', '').replace(/^.+,/, '');
};
