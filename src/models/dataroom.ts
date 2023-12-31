export interface DirectoryTree {
  children: DirectoryTree[];
  id: string;
  name: string;
  type: 'directory' | 'file';
  size: number;
  dateUploaded: string; // "Thu, 24 Aug 2023 21:07:13 GMT"
  private: boolean;
}

export interface Dataroom {
  id: string;
  access: {
    canDelete: boolean;
    canRead: boolean;
    canWrite: boolean;
  };
  directoryTree: DirectoryTree;
}
