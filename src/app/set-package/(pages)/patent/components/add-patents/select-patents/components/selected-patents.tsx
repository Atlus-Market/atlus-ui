'use client';

export const SelectedPatents = () => {

  const count = 1;

  if (!count) {
    return null;
  }

  const assetsWord = count > 1 ? 'assets' : 'asset';
  return (
    <div>
      <span className='text-sm text-orange font-medium'>{count} patent {assetsWord} selected</span>
    </div>
  );
};
