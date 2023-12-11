import { SerializedFile } from '@/redux/features/set-package/slices/documents';
import { NOT_FOUND } from '@/constants/general';
import { generateID } from '@/utils/id';

export const createSerializedFile = (file: File): SerializedFile => {
  return {
    id: generateID(),
    name: file.name,
    size: file.size,
    type: file.type,
    objectUrl: URL.createObjectURL(file),
  };
};

export const createFileFromSerializedFile = async (fileUpload: SerializedFile): Promise<File> => {
  const response = await fetch(fileUpload.objectUrl);
  const blobFile = await response.blob();
  return new File([blobFile], fileUpload.name, { type: fileUpload.type });
};

export const getFileExtension = (fileName: string): string => {
  const lastDot = fileName.lastIndexOf('.');

  if (lastDot === NOT_FOUND) {
    return '';
  }

  return fileName.slice(lastDot + 1); // +1 to not include the dot
};

export const cleanSerializedFile = (serializedFile: SerializedFile) => {
  window.URL.revokeObjectURL(serializedFile.objectUrl);
};

export const downloadBlobFile = (blob: Blob, fileName?: string): void => {
  const documentsZipFileUrl = window.URL.createObjectURL(blob);

  // download link
  const link = document.createElement('a');
  link.href = documentsZipFileUrl;
  link.setAttribute('download', fileName ?? '');
  document.body.appendChild(link);
  link.click();

  // clean up
  link.remove();
  window.URL.revokeObjectURL(documentsZipFileUrl);
};

export const dataImageURLToFile = async (
  dataUrl: string,
  fileName: string,
  mimeType: string = 'image/png'
): Promise<File> => {
  mimeType = mimeType || (dataUrl.match(/^data:([^;]+);/) || '')[1];
  return fetch(dataUrl)
    .then(function (res) {
      return res.arrayBuffer();
    })
    .then(function (buf) {
      return new File([buf], fileName, { type: mimeType });
    });
};
