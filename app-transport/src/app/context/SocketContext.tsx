// import React, { createContext, useEffect, useState, ReactNode } from "react";
// import { io, Socket } from "socket.io-client";

// // Define a context for the socket
// export const SocketContext = createContext<Socket | null>(null);

// // Define the type for SocketContextProvider props
// interface SocketContextProviderProps {
//   children: ReactNode;
// }

// // Provider component that provides the socket context
// export const SocketContextProvider: React.FC<SocketContextProviderProps> = ({
//   children,
// }) => {
//   const [socket, setSocket] = useState<Socket | null>(null);

//   useEffect(() => {
//     console.log("Initializing socket...");
//     const newSocket = io("http://localhost:9000");
//     setSocket(newSocket);

//     return () => {
//       console.log("Disconnecting socket...");
//       // Clean up socket connection
//       if (socket) {
//         socket.disconnect();
//       }
//     };
//   }, []);

//   console.log("Socket:", socket);

//   return (
//     <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
//   );
// };

// SocketContext.tsx
// SocketContext.tsx
import React, { createContext, ReactNode } from "react";
import { Socket } from "socket.io-client";

interface SocketContextProps {
  children: ReactNode;
  socket?: Socket<any, any> | null;
}

export const SocketContext = createContext<Socket<any, any> | null>(null);

export const SocketContextProvider: React.FC<SocketContextProps> = ({
  children,
  socket,
}) => {
  return (
    <SocketContext.Provider value={socket || null}>
      {children}
    </SocketContext.Provider>
  );
};
