import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { ReactNode } from 'react';

interface AtlusImageViewerProps {
  children: ReactNode;
}

export const AtlusImageZoom = ({ children }: AtlusImageViewerProps) => {
  return <Zoom>{children}</Zoom>;
};
