import Zoom, { UncontrolledProps } from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { ReactNode } from 'react';

interface AtlusImageViewerProps {
  children: ReactNode;
  uncontrolledZoomProps?: Partial<UncontrolledProps>;
}

export const AtlusImageZoom = ({ children, uncontrolledZoomProps }: AtlusImageViewerProps) => {
  return <Zoom {...uncontrolledZoomProps}>{children}</Zoom>;
};
