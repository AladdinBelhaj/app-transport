"use client";
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/navigation';
import { getToken } from '../../../utils/auth';
import { ReactNode } from 'react';

interface Props {
  redirect: string;
  children: ReactNode;
}

const SigninGuard: NextPage<Props> = ({ redirect, children }) => {
  console.log('hello')
  const router = useRouter();
  const token = getToken();
  if (token) {
    // Redirect to "/" if token exists
    router.replace(redirect);
    return null; // Return null to prevent rendering on the client side
  }

  return children;
};

export async function getServerSideProps() {
  const token = getToken();
  let redirect = '';

  if (token) {
    redirect = '/'; // Set the redirect path to "/" if token exists
  }

  return { props: { redirect } };
}

export default SigninGuard;
