import { NoData } from '@/app/dashboard/components/no-data';
import OnlineEducationSVG from '@/public/assets/images/online_education.svg';

export const NoSharedData = () => {
  return (
    <NoData
      image={OnlineEducationSVG}
      subtitle={<span className="text-dark-grey">Packages shared with you will appear here</span>}
    />
  );
};
