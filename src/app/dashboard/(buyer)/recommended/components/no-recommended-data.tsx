import { NoData } from '@/app/dashboard/components/no-data';
import SearchItemSVG from '@/public/assets/images/search_item.svg';

export const NoRecommendedData = () => {
  return (
    <NoData
      image={SearchItemSVG}
      subtitle={<span className="text-dark-grey">No packages match your interests yet</span>}
    />
  );
};
