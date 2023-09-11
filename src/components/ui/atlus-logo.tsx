import Image from 'next/image';
import AtlusSvgLogo from '@/public/assets/logos/logo-orange.svg';

interface AtlusLogoProps {
  width?: number;
  height?: number;
}

export default function AtlusLogo({ width = 30, height }: AtlusLogoProps) {
  return <Image width={width} height={height} priority src={AtlusSvgLogo} alt="Atlus logo" />;
}
