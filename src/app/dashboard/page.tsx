import { ListClientSession } from '@/app/dashboard/components/list-client-session';

export default async function DashboardPage() {
  return (
    <div className='p-16'>
      <h1 className='text-3xl mb-4'>Atlus Dashboard</h1>

      <div className='my-6'>
        <a href='/set-package/patents' className='text-orange underline'>
          Create new package
        </a>
      </div>

      <ListClientSession />
    </div>
  );
}
