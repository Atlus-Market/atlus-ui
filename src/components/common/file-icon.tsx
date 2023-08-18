import { Icon, IconSize } from '@/components/ui/icon/icon';

interface FileIconProps {
  extension: string;
  size?: IconSize;
}

const supportedFileExtensions = [
  'doc', 'docx', 'pdf', 'xls', 'xlsx', 'ppt', 'pptx', 'zip'
];

const imagesExtensions = ['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg'];

export const FileIcon = ({ extension, size = 40 }: FileIconProps) => {
  const e =
    supportedFileExtensions.includes(extension.toLowerCase()) ?
      extension :
      imagesExtensions.includes(extension.toLowerCase()) ?
        'image' :
        'pdf';
  const iconName = `files/${e}.svg`;
  return (
    <Icon name={iconName} size={size} />
  );
};
