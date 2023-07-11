'use client';

import { useEffect, useState } from 'react';
import LoadingBar from 'react-top-loading-bar';

interface AtlusTopLoadingBarProps {
  progress: number;
}

export const AtlusTopLoadingBar = ({ progress }: AtlusTopLoadingBarProps) => {
  const [loadingBarProgress, setLoadingBarProgress] = useState<number>(0);

  useEffect(() => {
    let tempProgress = progress;

    if (progress === 0) {
      // When having progress > 0, setting progress to 0 does not work,
      // progress remains the same.
      tempProgress = 0.01;
    } else if (progress >= 100) {
      // Do not make it 100, or it will disappear from the screen
      tempProgress = 99.99;
    }

    setLoadingBarProgress(tempProgress);
  }, [progress]);

  return (
    <LoadingBar
      progress={loadingBarProgress}
      height={6}
      color="var(--color-orange)"
      shadow={false}
    />
  );
};
