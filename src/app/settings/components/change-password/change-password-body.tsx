import { AtlusForm } from '@/components/ui/form/atlus-form';
import { AtlusModalContainer } from '@/components/ui/modal/container/atlus-modal-container';
import { AtlusModalHeader } from '@/components/ui/modal/atlus-modal-header';
import { AtlusCloseModalButton } from '@/components/ui/modal/atlus-close-modal-button';
import { AtlusModalTitle } from '@/components/ui/modal/atlus-modal-title';
import { AtlusModalFooter } from '@/components/ui/modal/atlus-modal-footer';
import { AtlusButton } from '@/components/ui/button/atlus-button';
import { AtlusModalBody } from '@/components/ui/modal/atlus-modal-body';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, ObjectSchema, string } from 'yup';
import { RequiredField } from '@/constants/form';
import { passwordValidator } from '@/components/ui/form/validators/password-validator';
import { AtlusFormInputPassword } from '@/components/ui/form/atlus-form-input-password';
import { useChangePassword } from '@/hooks/data/use-change-password';
import { useEffect } from 'react';
import { showSuccessNotification } from '@/components/ui/notification/atlus-notification';

interface ChangePasswordBodyProps {
  onCloseModal: () => void;
}

interface ChangePasswordForm {
  oldPassword: string;
  newPassword: string;
}

export const changePasswordFormSchema: ObjectSchema<ChangePasswordForm> = object({
  oldPassword: string().trim().required(RequiredField).test(passwordValidator),
  newPassword: string().trim().required(RequiredField).test(passwordValidator),
});

export const ChangePasswordBody = ({ onCloseModal }: ChangePasswordBodyProps) => {
  const formProps = useForm({
    resolver: yupResolver(changePasswordFormSchema),
  });
  const { register, getValues } = formProps;

  const { mutate, isLoading, isSuccess } = useChangePassword();

  useEffect(() => {
    if (isSuccess) {
      onCloseModal();
      showSuccessNotification({ text: 'Your password has been changed successfully!' });
    }
  }, [isSuccess, onCloseModal]);

  return (
    <AtlusForm
      formProps={formProps}
      onSubmit={async formValues => {
        mutate(formValues);
      }}
    >
      <AtlusModalContainer
        className="!w-auto"
        header={
          <AtlusModalHeader rightContent={<AtlusCloseModalButton onClick={onCloseModal} />}>
            <AtlusModalTitle text="Change password" />
          </AtlusModalHeader>
        }
        footer={
          <AtlusModalFooter>
            <div className="w-full text-center">
              <AtlusButton
                type="submit"
                className="atlus-btn-45 md:atlus-btn-53"
                isLoading={isLoading}
              >
                Save
              </AtlusButton>
            </div>
          </AtlusModalFooter>
        }
      >
        <AtlusModalBody>
          <AtlusFormInputPassword
            placeholder="Old password"
            label="Enter your current password"
            {...register('oldPassword')}
          />
          <AtlusFormInputPassword
            placeholder="New password"
            label="Enter new password"
            {...register('newPassword')}
            wrapperClassName="!mb-0"
          />
        </AtlusModalBody>
      </AtlusModalContainer>
    </AtlusForm>
  );
};
