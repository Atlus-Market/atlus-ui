import clsx from 'clsx';
import Image, { StaticImageData } from 'next/image';

interface StatProps {
  icon: string | StaticImageData;
  value: string | number;
  label: string;
}

export const Stat = ({ icon, label, value }: StatProps) => {
  return (
    <div
      className={clsx(
        'bg-white rounded-xl',
        'flex gap-4 items-center',
        'px-5 md:px-[40px]',
        'py-6 md:py-8',
        'w-fit min-w-[158px] md:min-w-[205px]'
      )}
    >
      <Image src={icon} alt={label} className="w-[32px] md:w-[40px] h-[32px] md:h-[40px]" />
      <div className="flex flex-col gap-[2px]">
        <span className="text-xl md:text-2xl font-geologica text-black">{value}</span>
        <span className="text-xs md:text-13 font-geologica text-dark-grey">{label}</span>
      </div>
    </div>
  );
};
