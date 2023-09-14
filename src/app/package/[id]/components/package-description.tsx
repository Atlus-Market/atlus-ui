import { VariableContainer } from '@/components/common/variable-container';

interface PackageDescriptionProps {
  description: string;
}

export const PackageDescription = ({ description }: PackageDescriptionProps) => {
  return (
    <VariableContainer wrapperClassname="mb-6 md:mb-8">
      <p className="text-black font-normal text-sm md:text-base mb-4">{description}</p>
    </VariableContainer>
  );
};
