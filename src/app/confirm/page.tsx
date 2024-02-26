import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { options } from '../api/auth/[...nextauth]/options';
import BackBtn from '@/components/BackBtn/BackBtn';

export default async function Confirm() {
    const session = await getServerSession(options);
    if (session) { //if (!session) {
        redirect('/dashboard');
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center"
        style={{
            color: '#fff',
            padding: '72px',
        }}>
            <BackBtn size={24} color='#fff' redirect='/auth' />
            <h1 className="text-4xl font-bold mb-5">Almost there!</h1>
            <h2 className="text-2xl mb-5">We've sent a <span style={{color: '#50C878', fontWeight: 600}}>confirmation email</span> to your inbox. Please click the link in the email to <span style={{color: '#50C878', fontWeight: 600}}>activate</span> your account. Can't find it? Check your spam folder or request a new email.</h2>
            <h3 className="text-lg">Need help? <span style={{color: '#50C878', fontWeight: 600}}>Contact us!</span></h3>
        </div>

    )
};