import ProgressBar from '@ramonak/react-progress-bar';

interface AtlusProgressBarProps {
  progress: number;
}

export const AtlusProgressBar = ({ progress }: AtlusProgressBarProps) => {
  return (
    <div className="flex items-center gap-4 w-full">
      <ProgressBar
        completed={progress}
        baseBgColor="var(--color-light-grey)"
        bgColor="var(--color-soft-black)"
        height="8px"
        borderRadius={progress === 0 ? '0' : '8px'}
        className="w-full"
        isLabelVisible={false}
      />
      <span className="text-xs text-soft-black">{progress}%</span>
    </div>
  );
};
