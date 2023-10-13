interface PackageAccessMenuItemProps {
  title: string;
  description?: string;
}

export const PackageAccessMenuItemContent = ({
  title,
  description,
}: PackageAccessMenuItemProps) => (
  <div className="w-full">
    <span className="text-soft-black text-sm font-medium block w-fullleading-none">{title}</span>
    {description && (
      <span className="text-dark-grey text-xs font-normal block leading-none mt-1">
        {description}
      </span>
    )}
  </div>
);
