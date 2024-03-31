import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { options } from '../api/auth/[...nextauth]/options';

import styles from './ATS.module.css';
import ATS from '@/components/Dashboard/ATS/ATS';

export default async function ATSDashboard() {
  const session = await getServerSession(options);
  if (!session) { //if (!session) {
    redirect('/auth?callbackUrl=/dashboard');
  }

  return (
    <div className={`${styles.dashContainer} flex`}>
      <ATS />
    </div>
  )
};