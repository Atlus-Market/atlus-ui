import AtlusLogo from '@/components/ui/atlus-logo';

export const AtlusSplashLoader = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center absolute top-0 left-0 bg-white">
      <AtlusLogo />
    </div>
  );
};
