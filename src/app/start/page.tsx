import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { options } from '../api/auth/[...nextauth]/options';
import StartComponent from '@/components/StartComponent/StartComponent';

export default async function Start() {
  const session = await getServerSession(options);
  if (session) { //if (!session) {
    redirect('/dashboard');
  }

  return (
    <div className={`flex`}>
        <StartComponent />
    </div>
  )
};