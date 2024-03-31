import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { options } from '../api/auth/[...nextauth]/options';
import ErrorPageClientComponent from '@/components/404/404';


export default async function ErrorPage() {
    const session = await getServerSession(options);
    if (session) { 
        redirect('/dashboard');
    }

    return (
        <ErrorPageClientComponent />
    )
};