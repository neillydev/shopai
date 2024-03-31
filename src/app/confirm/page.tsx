"use server";
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { options } from '../api/auth/[...nextauth]/options';
import ConfirmClientComponent from '@/components/Confirm/Confirm';
import { cookies } from 'next/headers';

export default async function Confirm() {
    const session = await getServerSession(options);
    if (session) {
        redirect('/dashboard');
    }

    const nextCookies = cookies();

    const success = nextCookies.get('registrationSuccess');
  
    if(!success) {
        redirect('/404');
    }

    return (
        <ConfirmClientComponent />
    )
};