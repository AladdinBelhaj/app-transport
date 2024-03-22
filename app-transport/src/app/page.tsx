"use client";
import ECommerce from "@/components/Dashboard/E-commerce";
import AuthGuard from "@/components/Auth/AuthGuard";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
// import { getToken } from "../../utils/auth";
// import { useRouter } from "next/navigation";

interface OnlineUser {
  userId: string;
  socketId: string;
}

export default function Home() {
  const userId = localStorage.getItem("id");
  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]);
  useEffect(() => {
    const newSocket = io("http://localhost:9000");
    setSocket(newSocket);
  }, []);

  useEffect(() => {
    if (socket === null) return;

    socket.emit("addNewUser", userId);

    socket.on("getOnlineUsers", (onlineUsers) => {
      setOnlineUsers(onlineUsers);
    });

    return () => {
      socket.off("getOnlineUsers");
    };
  }, [socket]);

  return (
    <AuthGuard redirect={"/auth/signin"}>
      <DefaultLayout>
        <ECommerce />
      </DefaultLayout>
    </AuthGuard>
  );
}
