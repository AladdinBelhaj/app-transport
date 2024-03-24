import React, { createContext, useEffect, useState, ReactNode } from "react";
import { io, Socket } from "socket.io-client";

export const SocketContext = createContext<Socket | null>(null);
export const OnlineUsersContext = createContext<OnlineUser[]>([]);
export const MessagesContext = createContext<Message[]>([]);

interface OnlineUser {
  userId: string;
  socketId: string;
}

interface Message {
  id: number;
  chatId: string;
  senderId: string;
  text: string;
  createdAt: string;
  updatedAt: string;
}
interface SocketContextProviderProps {
  children: ReactNode;
}

export const SocketContextProvider: React.FC<SocketContextProviderProps> = ({
  children,
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const userId = localStorage.getItem("id");
  useEffect(() => {
    const newSocket = io("http://localhost:9000");
    setSocket(newSocket);
  }, []);

  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]);

  useEffect(() => {
    if (socket === null) return;

    socket.emit("addNewUser", userId);

    socket.on("getOnlineUsers", (onlineUsers) => {
      setOnlineUsers(onlineUsers);
      console.log("Catch these", onlineUsers);
    });

    return () => {
      socket.off("getOnlineUsers");
    };
  }, [socket]);

  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (socket === null) return;

    socket.on("getMessage", (res) => {
      setMessages((prevMessages) => [...prevMessages, res]);
      console.log("All da mes:", res);
    });
  }, [socket]);

  console.log("Socket:", socket);

  return (
    <SocketContext.Provider value={socket}>
      <OnlineUsersContext.Provider value={onlineUsers}>
        {children}
      </OnlineUsersContext.Provider>
    </SocketContext.Provider>
  );
};
