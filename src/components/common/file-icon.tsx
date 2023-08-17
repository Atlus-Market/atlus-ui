import { Icon, IconSize } from '@/components/ui/icon/icon';

interface FileIconProps {
  extension: string;
  size?: IconSize;
}

const supportedFileExtensions = [
  'doc', 'docx', 'pdf', 'xls', 'xlsx', 'ppt', 'pptx', 'zip'
];

export const FileIcon = ({ extension, size = 40 }: FileIconProps) => {
  const e = supportedFileExtensions.includes(extension) ? extension : 'pdf';
  const iconName = `files/${e}.svg`;
  return (
    <Icon name={iconName} size={size} />
  );
};
