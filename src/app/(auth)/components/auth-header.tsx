import { AtlusTitle } from '@/components/ui/typography/atlus-title';
import { AtlusSubTitle } from '@/components/ui/typography/atlus-subtitle';

interface AuthHeaderProps {
  title: string;
  subtitle?: string;
}

export const AuthHeader = ({ title, subtitle }: AuthHeaderProps) => {
  return (
    <div className="mb-8 md:mb-[40px]">
      <AtlusTitle text={title} className="text-center mb-3 md:mb-6" />
      {subtitle && <AtlusSubTitle text={subtitle} className="text-center mt-2" />}
    </div>
  );
};
