import React, {
  useMemo,
  createContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { io, Socket } from "socket.io-client";

export const SocketContext = createContext<Socket | null>(null);
export const OnlineUsersContext = createContext<OnlineUser[]>([]);

interface OnlineUser {
  userId: string;
  socketId: string;
}

interface SocketContextProviderProps {
  children: ReactNode;
}

export const SocketContextProvider: React.FC<SocketContextProviderProps> = ({
  children,
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    console.log("Initializing socket...");
    const newSocket = io("http://localhost:9000");
    setSocket(newSocket);

    return () => {
      console.log("Disconnecting socket...");

      if (socket) {
        socket.disconnect();
      }
    };
  }, []);
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]);
  const userId = localStorage.getItem("id");

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

  console.log("Socket:", socket);

  return (
    <SocketContext.Provider value={socket}>
      <OnlineUsersContext.Provider value={onlineUsers}>
        {children}
      </OnlineUsersContext.Provider>
    </SocketContext.Provider>
  );
};
