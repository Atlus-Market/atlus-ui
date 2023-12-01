'use client';

import { object, ObjectSchema, string } from 'yup';
import { RequiredField } from '@/constants/form';
import { AtlusForm } from '@/components/ui/form/atlus-form';
import { useAtlusForm } from '@/components/ui/form/use-atlus-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import Highlighter, { Chunk, FindChunks } from 'react-highlight-words';
import {
  findChunks,
  getInvalidPatentsIds,
  patentIdValidator,
} from '@/app/(main)/set-package/[id]/(pages)/patents/components/add-patents/enter-patents-manually/tabs/enter-patents-number/components/enter-patents-ids/patent-id-validator';
import { EnterPatentsIdsManuallyForm } from '@/redux/features/set-package/slices/add-patents/slices/enter-patents';

export interface PatentsIdsForm {
  patentsIds: string;
}

const schema: ObjectSchema<PatentsIdsForm> = object({
  patentsIds: string().default('').test(patentIdValidator).required(RequiredField),
});

interface PatentsIdsFormProps {
  initialFormValues: PatentsIdsForm;
  onFormChange: (enterPatentsIdsManuallyForm: EnterPatentsIdsManuallyForm) => void;
}

const textStyles = 'text-sm text-soft-black leading-5';

export const PatentsIdsForm = ({ initialFormValues, onFormChange }: PatentsIdsFormProps) => {
  const [hasFocus, setHasFocus] = useState<boolean>(false);
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const formProps = useAtlusForm<PatentsIdsForm>({
    formOptions: {
      resolver: yupResolver(schema),
      defaultValues: initialFormValues,
    },
  });
  const { watch, register, formState } = formProps;
  const { ref, onBlur, ...rest } = register('patentsIds');
  const patentsIds = watch('patentsIds') ?? '';

  useEffect(() => {
    if (hasFocus) {
      textAreaRef.current?.focus();
    }
  }, [hasFocus]);

  const isValid = formState.isValid;

  useEffect(() => {
    onFormChange({
      formState: {
        isValid,
      },
      formValues: {
        patentsIds,
      },
    });
  }, [patentsIds, isValid, onFormChange]);

  return (
    <AtlusForm formProps={formProps}>
      <div
        className={clsx(
          'w-full h-[218px]',
          'border border-orange',
          'rounded-lg',
          'px-[13px] py-[17px] mb-[9px]'
        )}
      >
        <textarea
          spellCheck={false}
          className={clsx(
            'w-full h-full resize-none ',
            textStyles,
            'caret-soft-black outline-none',
            'overflow-auto',
            hasFocus ? 'block' : 'hidden'
          )}
          {...rest}
          ref={e => {
            if (e) {
              textAreaRef.current = e;
              ref(e);
            }
          }}
          onBlur={e => {
            setHasFocus(false);
            onBlur(e);
          }}
        />
        {!hasFocus && (
          <div className={clsx('w-full h-full')} onClick={() => setHasFocus(true)}>
            <Highlighter
              className={clsx(textStyles, 'flex')}
              highlightClassName="bg-transparent text-red"
              unhighlightClassName="bg-transparent word-break-break-word"
              searchWords={getInvalidPatentsIds(patentsIds)}
              autoEscape={true}
              textToHighlight={patentsIds}
              findChunks={findChunks}
            />
          </div>
        )}
      </div>
    </AtlusForm>
  );
};
