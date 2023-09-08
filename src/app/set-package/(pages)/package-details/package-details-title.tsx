'use client';

import { AtlusFormInput } from '@/components/ui/form/atlus-form-input';
import { useFormContext, useWatch } from 'react-hook-form';
import {
  IPackageDetailsForm
} from '@/app/set-package/(pages)/package-details/package-details-form';
import { AtlusLoadingSpinner } from '@/components/ui/loading-spinner/atlus-loading-spinner';
import { useCallback, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  packageTitleValidator
} from '@/redux/features/set-package/thunks/package-title-validator.thunk';
import {
  selectIsValidatingTitle,
  selectIsValidTitle
} from '@/redux/features/set-package/selectors/package-details.selectors';
import { useAtlusSession } from '@/app/(auth)/session/use-atlus-session';

type Abort = (reason?: string) => void;

export const PackageDetailsTitle = () => {
  const session = useAtlusSession();
  const userId = session.data?.user?.id ?? '';
  const isValidTitle = useAppSelector(selectIsValidTitle);
  const isValidatingTitle = useAppSelector(selectIsValidatingTitle);
  const { register, setError, clearErrors } = useFormContext<IPackageDetailsForm>();
  const dispatch = useAppDispatch();
  const abortRef = useRef<{ abort: Abort } | null>(null);
  const title = useWatch<IPackageDetailsForm>({ name: 'title' }) as string;

  useEffect(() => {
    abortRef.current?.abort();
    // @ts-ignore
    const thunkValue = dispatch(packageTitleValidator({ title, userId }));
    abortRef.current = { abort: thunkValue.abort };
  }, [dispatch, title]);

  const handleInvalidTitleError = useCallback(() => {
    if (!title || isValidatingTitle) {
      return;
    }
    if (!isValidTitle) {
      setError('title', { type: 'custom', message: 'This title is already taken.' });
    } else {
      clearErrors('title');
    }
  }, [isValidatingTitle, isValidTitle, title, setError, clearErrors]);

  useEffect(() => {
    handleInvalidTitleError();
  }, [handleInvalidTitleError]);

  return (
    <div>
      <AtlusFormInput
        label='Title'
        placeholder='Enter package title'
        type='text'
        {...register('title')}
        rightIcon={isValidatingTitle && <AtlusLoadingSpinner hexColor='#D9D9D9' />}
        onBlur={handleInvalidTitleError}
      />
    </div>
  );
};
