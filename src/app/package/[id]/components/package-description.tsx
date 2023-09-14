import { VariableContainer } from '@/components/common/variable-container';

interface PackageDescriptionProps {
  description: string;
}

export const PackageDescription = ({ description }: PackageDescriptionProps) => {
  return (
    <VariableContainer>
      <p className="text-black font-normal text-sm md:text-base mb-4">{description}</p>
    </VariableContainer>
  );
};
