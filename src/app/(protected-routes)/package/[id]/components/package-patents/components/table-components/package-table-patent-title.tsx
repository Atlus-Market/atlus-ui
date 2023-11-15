interface PackageTableTitleProps {
  title: string;
}

export const PackageTablePatentTitle = ({ title }: PackageTableTitleProps) => {
  return <span className="text-sm md:text-15 text-soft-black font-medium">{title}</span>;
};
