import { HiUserAdd } from 'react-icons/hi';

interface AddContactButtonProps {
  onClick?: () => void;
}

export const AddContactOption = ({ onClick }: AddContactButtonProps) => {
  return (
    <button className='flex items-center py-[10px] !pb-5' onClick={onClick}>
      <div className='inline-flex items-center justify-center bg-orange w-8 h-8 rounded-[50%] mr-2'>
        <HiUserAdd color='#ffffff' size='20' />
      </div>
      <span className='text-sm text-orange font-medium'>Add Contact</span>
    </button>
  );
};
