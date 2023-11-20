interface SettingsTitleProps {
  title: string;
}

export const SettingsTitle = ({ title }: SettingsTitleProps) => {
  return <div className="text-xl mb-4 md:mb-8">{title}</div>;
};
