"use client";
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/navigation';
import { getToken } from '../../../utils/auth';
import { ReactNode } from 'react';

interface Props {
  redirect: string;
  children: ReactNode;
}

const AuthGuard: NextPage<Props> = ({ redirect ,children}) => {
  console.log('hello')
  const router = useRouter();
  const token = getToken();
  if (token == null) {
    // Redirect server-side
    router.replace(redirect);
    return null; // Return null to prevent rendering on the client side
  }else if (token != null && redirect=="/auth/signin"){
    router.replace('/');
  }

  return children;
};

export async function getServerSideProps() {
  const token = getToken();
  let redirect = '';

  if (!token) {
    redirect = '/auth/signin'; // Set the redirect path if token doesn't exist
  }

  return { props: { redirect } };
}

export default AuthGuard;
