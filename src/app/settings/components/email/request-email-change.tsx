import { AtlusModalHeader } from '@/components/ui/modal/atlus-modal-header';
import { AtlusCloseModalButton } from '@/components/ui/modal/atlus-close-modal-button';
import { AtlusModalTitle } from '@/components/ui/modal/atlus-modal-title';
import { AtlusModalBody } from '@/components/ui/modal/atlus-modal-body';
import { AtlusModalContainer } from '@/components/ui/modal/container/atlus-modal-container';
import { AtlusButton } from '@/components/ui/button/atlus-button';
import { object, ObjectSchema } from 'yup';
import { emailField } from '@/components/ui/form/validators/email-field';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AtlusForm } from '@/components/ui/form/atlus-form';
import { AtlusFormInput } from '@/components/ui/form/atlus-form-input';
import { AtlusModalFooter } from '@/components/ui/modal/atlus-modal-footer';

interface RequestEmailChangeProps {
  onCloseModal: () => void;
  onRequestEmailSuccess: (email: string) => void;
}

interface ChangeEmailForm {
  email: string;
}

export const changeEmailFormSchema: ObjectSchema<ChangeEmailForm> = object({
  email: emailField,
});

export const RequestEmailChange = ({
  onCloseModal,
  onRequestEmailSuccess,
}: RequestEmailChangeProps) => {
  const formProps = useForm({
    resolver: yupResolver(changeEmailFormSchema),
  });

  return (
    <AtlusForm
      formProps={formProps}
      onSubmit={formValues => onRequestEmailSuccess(formValues.email)}
    >
      <AtlusModalContainer
        className="w-auto"
        header={
          <AtlusModalHeader rightContent={<AtlusCloseModalButton onClick={onCloseModal} />}>
            <AtlusModalTitle text="Change email address" />
          </AtlusModalHeader>
        }
        footer={
          <AtlusModalFooter>
            <div className="w-full text-center">
              <AtlusButton type="submit" className="atlus-btn-45 md:atlus-btn-53">
                Next
              </AtlusButton>
            </div>
          </AtlusModalFooter>
        }
      >
        <AtlusModalBody>
          <AtlusFormInput
            placeholder="Enter email address"
            label="New email"
            {...formProps.register('email')}
            wrapperClassName="!mb-0"
          />
        </AtlusModalBody>
      </AtlusModalContainer>
    </AtlusForm>
  );
};
