import { SerializedFile } from '@/redux/features/set-package/slices/documents';
import { NOT_FOUND } from '@/constants/general';
import { generateID } from '@/utils/id';

export const createSerializedFile = (file: File): SerializedFile => {
  return {
    id: generateID(),
    name: file.name,
    size: file.size,
    type: file.type,
    objectUrl: URL.createObjectURL(file)
  };
};

export const createFileFromSerializedFile = async (fileUpload: SerializedFile): Promise<File> => {
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
