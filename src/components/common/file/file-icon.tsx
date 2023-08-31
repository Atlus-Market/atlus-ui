import { Icon, IconSize } from '@/components/ui/icon/icon';

interface FileIconProps {
  extension: string;
  size?: IconSize;
}


const PdfSvgFileName = 'pdf.svg';

const files = [
  ['doc', 'docx'].map(e => ([e, 'doc.svg'])),
  ['pdf'].map(e => ([e, PdfSvgFileName])),
  ['xls', 'xlsx'].map(e => ([e, 'xls.svg'])),
  ['ppt', 'ppt'].map(e => ([e, 'ppt.svg'])),
  ['zip'].map(e => ([e, 'zip.svg'])),
  ['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg'].map(e => ([e, 'image.svg']))
] as const;

const m = new Map<string, string>(
// @ts-ignore
  files.flatMap(x => x)
);

export const FileIcon = ({ extension, size = 40 }: FileIconProps) => {
  const iconName = `files/${m.get(extension.toLowerCase()) || PdfSvgFileName}`;
  return (
    <Icon name={iconName} size={size} />
  );
};
