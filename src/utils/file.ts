import { SerializedFileUpload } from '@/redux/features/set-package/slices/documents';
import { NOT_FOUND } from '@/constants/general';

export const createFileFromSerializedFileUpload = (fileUpload: SerializedFileUpload): Promise<File> => {
  return fetch(fileUpload.objectUrl)
    .then(r => r.blob())
    .then(blobFile => new File(
      [blobFile], fileUpload.name, { type: fileUpload.type }
    ));
};

export const getFileExtension = (fileName: string): string => {
  const lastDot = fileName.lastIndexOf('.');

  if (lastDot === NOT_FOUND) {
    return '';
  }

  return fileName.slice(lastDot + 1); // +1 to not include the dot
};
