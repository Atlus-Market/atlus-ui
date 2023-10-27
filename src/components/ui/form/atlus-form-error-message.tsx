import { ErrorMessage } from '@hookform/error-message';
import { FieldErrors } from 'react-hook-form';

interface AtlusFormErrorMessageProps {
  name: string | string[] | undefined;
  errors?: FieldErrors;
}

export const AtlusFormErrorMessage = ({ name, errors }: AtlusFormErrorMessageProps) => {
  if (!errors || !name) {
    return null;
  }

  const namesToRender: string[] = Array.isArray(name) ? name : [name];
  return (
    <>
      {namesToRender.map(name => (
        <ErrorMessage
          key={name}
          errors={errors}
          name={name}
          render={({ message }) => <p className="text-red text-xs pl-3">{message}</p>}
        />
      ))}
    </>
  );
};
