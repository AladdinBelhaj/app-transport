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
    const socket = io("http://localhost:8080");

    socket.on("notification", (message) => {
      console.log("Received notification:", message);
    });

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
