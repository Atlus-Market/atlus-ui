interface ChangeLinkProps {
  changePartText?: string;
}

export const ChangeLink = ({ changePartText }: ChangeLinkProps) => {
  return (
    <a href="#" className="text-orange self-end text-sm md:text-base font-medium leading-5">
      change <span className="hidden md:inline-block">{changePartText}</span>
    </a>
  );
};
