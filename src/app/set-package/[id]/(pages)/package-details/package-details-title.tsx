'use client';

import { AtlusFormInput } from '@/components/ui/form/atlus-form-input';
import { useFormContext, useWatch } from 'react-hook-form';
import { ExtendedPackageDetailsForm } from '@/app/set-package/[id]/(pages)/package-details/package-details-form';
import { AtlusLoadingSpinner } from '@/components/ui/loading-spinner/atlus-loading-spinner';
import { useCallback, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { packageTitleValidator } from '@/redux/features/set-package/thunks/package-title-validator.thunk';
import {
  selectIsValidatingTitle,
  selectIsValidTitle,
} from '@/redux/features/set-package/selectors/package-details.selectors';
import { useAtlusUser } from '@/app/(auth)/session/use-atlus-user';

type Abort = (reason?: string) => void;

export const hasValidTitleName = 'hasValidTitleName';
const titleName = 'title';
export const invalidTitleErrorMessage = 'This title is already taken.';

export const PackageDetailsTitle = () => {
  const { data: user } = useAtlusUser();
  const userId = user?.id;
  const isValidTitle = useAppSelector(selectIsValidTitle);
  const isValidatingTitle = useAppSelector(selectIsValidatingTitle);
  const {
    register,
    setValue,
    trigger,
    formState: { errors },
  } = useFormContext<ExtendedPackageDetailsForm>();
  const dispatch = useAppDispatch();
  const abortRef = useRef<{ abort: Abort } | null>(null);
  const title = useWatch<ExtendedPackageDetailsForm>({ name: titleName }) as string;

  const hasErrorTitle = !!errors[titleName];

  useEffect(() => {
    abortRef.current?.abort();
    // @ts-ignore
    const thunkValue = dispatch(packageTitleValidator({ title, userId }));
    abortRef.current = { abort: thunkValue.abort };
  }, [dispatch, title, userId]);

  const handleInvalidTitleError = useCallback(() => {
    if (!title || isValidatingTitle) {
      setValue(hasValidTitleName, false);
      return;
    }
    if (!isValidTitle) {
      setValue(hasValidTitleName, false);
      trigger(hasValidTitleName);
    } else {
      // The title is valid
      setValue(hasValidTitleName, true);
      trigger(hasValidTitleName);
    }
  }, [title, isValidatingTitle, isValidTitle, setValue, trigger]);

  useEffect(() => {
    handleInvalidTitleError();
  }, [handleInvalidTitleError]);

  return (
    <div>
      <AtlusFormInput
        label="Title"
        placeholder="Enter package title"
        type="text"
        {...register('title')}
        rightIcon={isValidatingTitle && <AtlusLoadingSpinner />}
        onBlur={handleInvalidTitleError}
        errorNames={
          hasErrorTitle
            ? titleName
            : !isValidTitle && !isValidatingTitle
            ? hasValidTitleName
            : undefined
        }
      />
    </div>
  );
};
