interface AtlusErrorMessageProps {
  errorMessage?: string;
}

export const AtlusErrorMessage = ({ errorMessage }: AtlusErrorMessageProps) => {
  if (!errorMessage) {
    return null;
  }

  return (
    <div className='text-base text-orange text-center'>
      {errorMessage}
    </div>
  );
};
