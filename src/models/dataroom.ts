export interface Dataroom {
  access: {
    canDelete: boolean;
    canRead: boolean;
    canWrite: boolean;
  },
  directoryTree: {
    children: Dataroom[],
    name: string;
    type: 'directory' | 'file'
  }
}
