import { NoData } from '@/components/common/no-data';
import AddNotesSVG from '@/public/assets/images/add_notes.svg';

export const NoWatchlistData = () => {
  return (
    <NoData
      image={AddNotesSVG}
      subtitle={
        <span className="text-dark-grey">Add packages to your watchlist to see them here</span>
      }
    />
  );
};
