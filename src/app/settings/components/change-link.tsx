interface ChangeLinkProps {
  changePartText?: string;
  onClick?: () => void;
}

export const ChangeLink = ({ changePartText, onClick }: ChangeLinkProps) => {
  return (
    <a
      href="#"
      className="text-orange self-end text-sm md:text-base font-medium leading-5"
      onClick={onClick}
    >
      change <span className="hidden md:inline-block">{changePartText}</span>
    </a>
  );
};
