import clsx from 'clsx';

export const PatentsIdsTextArea = () => {
  return (
    <>
    <textarea
      className={clsx(
        'w-full h-[218px]',
        'border border-orange',
        'resize-none outline-none rounded-lg',
        'px-[13px] py-[17px]',
        'text-sm text-soft-black leading-5'
      )}
    >
    </textarea>
    <span className='text-xs leading-normal text-dark-grey'>
      Patent numbers must include country code (US, CN, etc.), PCT, or WO as prefixes.
    </span>
    </>
  );
};
