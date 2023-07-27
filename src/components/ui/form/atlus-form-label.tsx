interface AtlusFormLabelProps {
  label?: string;
  htmlFor?: string;
}

export const AtlusFormLabel = ({ label, ...rest }: AtlusFormLabelProps) => {
  if (!label) {
    return null;
  }

  return (
    <label
      className='text-xs md:text-sm leading-[17px] font-medium mb-2 inline-block' {...rest}>
      {label}
    </label>
  );
};
