"use client";
import ECommerce from "@/components/Dashboard/E-commerce";
import AuthGuard from "@/components/Auth/AuthGuard";
// import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useEffect } from "react";
import io from "socket.io-client";
// import { getToken } from "../../utils/auth";
// import { useRouter } from "next/navigation";
// export const metadata: Metadata = {
//   title: "app-transport",
//   // description: "This is Next.js Home for TailAdmin Dashboard Template",
// };

export default function Home() {
  useEffect(() => {
    // Connect to the socket server
    const socket = io("http://localhost:8080"); // Replace 'http://localhost:8080' with your server's address

    // Listen for socket events
    socket.on("notification", (message) => {
      console.log("Received notification:", message);
      // Handle the notification as needed
    });

    // Disconnect from the socket server when component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <AuthGuard redirect={"/auth/signin"}>
      <DefaultLayout>
        <ECommerce />
      </DefaultLayout>
    </AuthGuard>
  );
}
