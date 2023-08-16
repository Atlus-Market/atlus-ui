import { SerializedFileUpload } from '@/redux/features/set-package/slices/documents';

export const createFileFromSerializedFileUpload = (fileUpload: SerializedFileUpload): Promise<File> => {
  return fetch(fileUpload.objectUrl)
    .then(r => r.blob())
    .then(blobFile => new File(
      [blobFile], fileUpload.name, { type: fileUpload.type }
    ));
};
