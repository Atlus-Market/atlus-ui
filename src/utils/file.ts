import { SerializedFileUpload } from '@/redux/features/set-package/slices/documents';
import { NOT_FOUND } from '@/constants/general';

export const createFileFromSerializedFileUpload = async (fileUpload: SerializedFileUpload): Promise<File> => {
  const response = await fetch(fileUpload.objectUrl);
  const blobFile = await response.blob();
  return new File(
    [blobFile], fileUpload.name, { type: fileUpload.type }
  );
};

export const getFileExtension = (fileName: string): string => {
  const lastDot = fileName.lastIndexOf('.');

  if (lastDot === NOT_FOUND) {
    return '';
  }

  return fileName.slice(lastDot + 1); // +1 to not include the dot
};
