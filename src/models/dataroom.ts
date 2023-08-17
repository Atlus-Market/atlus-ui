export interface DirectoryTree {
  children: DirectoryTree[],
  name: string;
  type: 'directory' | 'file'
}

export interface Dataroom {
  access: {
    canDelete: boolean;
    canRead: boolean;
    canWrite: boolean;
  },
  directoryTree: DirectoryTree;
}
