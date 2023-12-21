import { redirect } from "next/navigation";
import { getServerSession } from 'next-auth/next';
import {AuthForm} from '@/components/Auth/AuthForm';

export default async function Auth() {

  const session = await getServerSession();

  if (session) redirect("/dashboard");

  return (
    <AuthForm />
  )
}
