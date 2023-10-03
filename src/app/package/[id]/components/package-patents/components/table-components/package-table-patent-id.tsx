interface PackageTablePatentIdProps {
  patentId: string;
}

export const PackageTablePatentId = ({ patentId }: PackageTablePatentIdProps) => {
  return <span className="text-[13px] md:text-[15px] text-dark-cyan">{patentId}</span>;
};