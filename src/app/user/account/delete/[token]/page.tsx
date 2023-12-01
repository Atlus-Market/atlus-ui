import { DeleteUserAccountHandler } from '@/app/user/account/delete/[token]/delete-user-account-handler';
import { deleteUserAccountOnServer } from '@/api/user/delete-user-account-on-server';
import { isAxiosError } from 'axios';
import { defaultErrorMessage } from '@/constants/api';

interface UserAccountDeletePageProps {
  params: {
    token: string;
  };
}

export default async function UserAccountDelete({ params: { token } }: UserAccountDeletePageProps) {
  let deleteUserAccountResult = false;
  let errorMessage = defaultErrorMessage;

  try {
    await deleteUserAccountOnServer(token);
    deleteUserAccountResult = true;
  } catch (e) {
    if (e && isAxiosError(e) && e.response) {
      errorMessage = e.response.data.msg ?? defaultErrorMessage;
    }
    console.log('Delete account error: ', e);
    deleteUserAccountResult = false;
  }

  return (
    <DeleteUserAccountHandler
      deleteUserAccountResult={deleteUserAccountResult}
      errorMessage={errorMessage}
    />
  );
}
