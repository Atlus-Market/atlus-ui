import { HiEye } from 'react-icons/hi2';
import { AtlusFormInput, AtlusFormInputProps } from '@/components/ui/form/atlus-form-input';
import { forwardRef, useState } from 'react';
import { HiEyeOff } from 'react-icons/hi';

type AtlusFormInputPasswordProps = AtlusFormInputProps;


const iconClassNames = 'text-middle-grey text-base md:text-xl select-none';
export const AtlusFormInputPassword = forwardRef<HTMLInputElement, AtlusFormInputPasswordProps>(
  function AtlusFormInputPassword({ type, ...rest }, ref) {
    const [isShowingPassword, setIsShowingPassword] = useState<boolean>(false);

    return (
      <AtlusFormInput
        ref={ref}
        type={isShowingPassword ? 'text' : type}
        inputClassName="flex-grow"
        rightIcon={
          isShowingPassword ?
            <HiEyeOff
              onClick={() => setIsShowingPassword(false)}
              className={iconClassNames}
            /> :
            <HiEye
              onClick={() => setIsShowingPassword(true)}
              className={iconClassNames}
            />
        }
        {...rest}
      />
    );
  });
