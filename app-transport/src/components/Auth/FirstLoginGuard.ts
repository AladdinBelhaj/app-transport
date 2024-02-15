"use client";
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';
import { fetchUserData, useUserData } from '../../../utils/getUserData';
import { useEffect } from 'react';
interface Props {
  redirect: string;
  children: ReactNode;
}

const FirstLoginGuard: NextPage<Props> = ({ redirect, children }) => {
  const router = useRouter();
  const userData = useUserData();
    const isFirstLogin = userData?.isFirstLogin;
    useEffect(() => {
        // Disable cursor if isFirstLogin is true
        if (isFirstLogin === "1") {
          document.body.style.cursor = 'not-allowed';
        } else {
          document.body.style.cursor = 'auto';
        }
    
        // Clean up to reset cursor when component unmounts
        return () => {
          document.body.style.cursor = 'auto';
        };
      }, [isFirstLogin]);
//   if (isFirstLogin == "1") {
//     // Redirect to "/" if token exists
//     router.replace(redirect);
//     return null; // Return null to prevent rendering on the client side
//   }






  return children;
};

export async function getServerSideProps() {
    const userData = await fetchUserData();
    const isFirstLogin = userData?.isFirstLogin;
  let redirect = '';

  if (isFirstLogin == "1") {
    redirect = '/settings'; // Set the redirect path to "/" if token exists
  }

  return { props: { redirect } };
}


export default FirstLoginGuard;
