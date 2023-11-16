'use client';

import { AtlusIsVisible } from '@/components/common/atlus-is-visible';
import { AtlusLoadingSpinner } from '@/components/ui/loading-spinner/atlus-loading-spinner';
import { useToggleState } from '@/hooks/use-toggle-state';

export const LoadMorePackages = () => {
  const { isOn, setOff, setOn } = useToggleState(false);
  console.log(isOn);
  return (
    <>
      <button onClick={() => (isOn ? setOff() : setOn())}>toggle</button>
      <AtlusIsVisible
        enabled={isOn}
        onVisibilityChange={inView => {
          console.log('isInView: ', inView);
        }}
      >
        <div className="w-full flex justify-center">
          <AtlusLoadingSpinner />
        </div>
      </AtlusIsVisible>
    </>
  );
};
