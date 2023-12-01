interface PackageTablePatentIdProps {
  patentId: string;
}

export const PackageTablePatentId = ({ patentId }: PackageTablePatentIdProps) => {
  return <span className="text-13 md:text-15 text-dark-cyan">{patentId}</span>;
};
