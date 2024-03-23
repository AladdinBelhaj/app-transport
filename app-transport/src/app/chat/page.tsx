// "use client";
// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import DefaultLayout from "@/components/Layouts/DefaultLayout";
// import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
// import { io, Socket } from "socket.io-client";

// interface OnlineUser {
//   userId: string;
//   socketId: string;
// }

// interface Chat {
//   id: number;
//   members: string;
//   createdAt: string;
//   updatedAt: string;
// }

// interface Message {
//   id: number;
//   chatId: string;
//   senderId: string;
//   text: string;
//   createdAt: string;
//   updatedAt: string;
// }

// interface User {
//   id: string;
//   fullname: string;
//   picture: string;
// }

// type Notification = {
//   senderId: string;
//   isRead: boolean;
//   date: Date;
// };

// const Chat = () => {
//   const [userChats, setUserChats] = useState<Chat[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [usersData, setUsersData] = useState<any[]>([]); // Declare usersData state variable
//   const [currentChat, setCurrentChat] = useState<Chat | null>(null);
//   const [clickedUser, setClickedUser] = useState<any>(null);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [isMessagesLoading, setIsMessagesLoading] = useState(true);
//   const [currentUser, setCurrentUser] = useState<User | null>(null);
//   const [newMessage, setNewMessage] = useState<Message[]>([]);
//   const [textMessage, setTextMessage] = useState("");
//   const [socket, setSocket] = useState<Socket | null>(null);
//   const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]);
//   const [notifications, setNotifications] = useState<Notification[]>([]);

//   const userId = localStorage.getItem("id") || "";

//   const currentChatRef = useRef(currentChat);

//   const scroll = useRef<HTMLDivElement>(null); // Specify the type of the ref

//   useEffect(() => {
//     if (scroll.current) {
//       scroll.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, []);
//   useEffect(() => {
//     currentChatRef.current = currentChat;
//   }, [currentChat]);

//   useEffect(() => {
//     const newSocket = io("http://localhost:9000");
//     setSocket(newSocket);
//   }, [currentUser]);

//   useEffect(() => {
//     if (socket === null) return;

//     socket.emit("addNewUser", userId);

//     socket.on("getOnlineUsers", (onlineUsers) => {
//       setOnlineUsers(onlineUsers);
//       console.log("Catch these", onlineUsers);
//     });

//     return () => {
//       socket.off("getOnlineUsers");
//     };
//   }, [socket]);

//   useEffect(() => {
//     if (socket === null || !currentChat) return;

//     const membersArray = currentChat.members.split(",");
//     const recepientId = membersArray.find((memberId) => memberId !== userId);

//     socket.emit("sendMessage", { ...newMessage, recepientId });
//   }, [newMessage]);

//   useEffect(() => {
//     if (socket === null) return;

//     socket.on("getMessage", (res) => {
//       setMessages((prevMessages) => [...prevMessages, res]);
//     });
//   }, [socket, currentChat]);

//   useEffect(() => {
//     if (socket === null) return;

//     socket.on("getNotification", (res) => {
//       const membersArray = currentChatRef.current?.members.split(",");
//       const isChatOpen = membersArray?.some((id) => id === res.senderId);

//       if (!currentChatRef.current) {
//         setNotifications((prev) => [res, ...prev]);
//       } else {
//         setNotifications((prev) => [{ ...res, isRead: isChatOpen }, ...prev]);
//       }
//     });
//   }, [socket]);

//   console.log("Notifications: ", notifications);
//   const membersArray = currentChat?.members.split(",");
//   console.log(membersArray);
//   const isChatOpen = membersArray?.some((id) => id == "1");
//   console.log("CHAT OPEN?!", isChatOpen);

//   // console.log("ONLINE USERS:", onlineUsers);
//   useEffect(() => {
//     const fetchCurrentUser = async () => {
//       try {
//         const response = await axios.get(
//           `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${userId}`,
//         );
//         setCurrentUser(response.data);
//       } catch (error) {
//         console.error("Error fetching current user:", error);
//       }
//     };

//     fetchCurrentUser();
//   }, []);

//   useEffect(() => {
//     const fetchUserChats = async () => {
//       try {
//         const response = await axios.get(
//           `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/chats/${userId}`,
//         );
//         setUserChats(response.data);
//         setIsLoading(false);
//       } catch (error) {
//         setIsLoading(false);
//       }
//     };

//     fetchUserChats();
//   }, [userId]);

//   useEffect(() => {
//     const fetchUserMessages = async () => {
//       try {
//         const response = await axios.get(
//           `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/messages/${currentChat?.id}`, // Adjust endpoint as per your backend API
//         );
//         setMessages(response.data);
//         setIsMessagesLoading(false); // Update loading state after fetching messages
//       } catch (error) {
//         console.error("Error fetching messages:", error);
//         setIsMessagesLoading(false); // Update loading state in case of error
//       }
//     };

//     fetchUserMessages();
//   }, [currentChat]);
//   // console.log(messages);

//   useEffect(() => {
//     const fetchUsersData = async () => {
//       if (!userChats.length) return; // Ensure userChats has data before proceeding

//       try {
//         const otherUserIds = userChats
//           .flatMap((chat) => chat.members.split(","))
//           .filter((id) => id !== userId);

//         const usersDataPromises = otherUserIds.map((id) =>
//           axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${id}`),
//         );

//         const usersDataResponses = await Promise.all(usersDataPromises);

//         const usersData = usersDataResponses.map((response) => response.data);

//         setUsersData(usersData);

//         // console.log("Users data:", usersData);
//       } catch (error) {
//         console.error("Error fetching other users data:", error);
//       }
//     };

//     fetchUsersData();
//   }, [userChats, userId]);

//   const handleUserClick = (user: any) => {
//     const chat = userChats.find(
//       (chat) =>
//         chat.members.includes(userId.toString()) &&
//         chat.members.includes(user.id.toString()),
//     );
//     setCurrentChat(chat || null);
//     localStorage.setItem("currentChat", JSON.stringify(chat || null));
//     setClickedUser(user);
//   };

//   // console.log(currentChat);

//   const handleMessageChange = (event: any) => {
//     setTextMessage(event.target.value);
//     // console.log(newMessage);
//   };

//   const handleSendMessage = async () => {
//     try {
//       // Prepare the message data
//       const messageData = {
//         chatId: currentChat?.id, // Assuming currentChat contains the chat information
//         senderId: userId, // Assuming userId contains the current user's ID
//         text: textMessage,
//       };

//       // Send the message data to the backend
//       const response = await axios.post(
//         `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/messages`,
//         messageData,
//       );

//       setNewMessage(response.data);
//       setMessages((prevMessages) => [...prevMessages, response.data]);

//       setTextMessage("");
//     } catch (error) {
//       console.error("Error sending message:", error);
//     }
//   };

//   return (
//     <DefaultLayout>
//       <Breadcrumb pageName="Chat" />
//       <>
//         {/* component */}
//         <div className="text-gray-800 flex h-screen flex-row antialiased">
//           <div className="bg-gray-100 flex w-96 flex-shrink-0 flex-row p-4">
//             <div className="-mr-4 flex h-full w-full flex-col py-4 pl-4 pr-4">
//               <div className="flex flex-row items-center">
//                 <div className="flex flex-row items-center">
//                   <div className="text-xl font-semibold">Messages</div>
//                   <div className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-medium text-white">
//                     5
//                   </div>
//                 </div>
//               </div>
//               <div className="mt-5">
//                 <ul className="flex flex-row items-center justify-between">
//                   <li>
//                     <a
//                       href="#"
//                       className="relative flex items-center pb-3 text-xs font-semibold text-indigo-800"
//                     >
//                       <span>All Conversations</span>
//                       <span className="absolute bottom-0 left-0 h-1 w-6 rounded-full bg-indigo-800" />
//                     </a>
//                   </li>
//                 </ul>
//               </div>
//               <div className="mt-5">
//                 <div className="text-gray-400 text-xs font-semibold uppercase">
//                   Users
//                 </div>
//               </div>
//               <div className="mt-2">
//                 <div className="-mx-4 flex flex-col">
//                   {/* <div className="flex flex-row items-center border-l-2 border-red-500 bg-gradient-to-r from-red-100 to-transparent p-4"> */}
//                   {usersData.map((user) => {
//                     const isOnline = onlineUsers.some(
//                       (onlineUser) => onlineUser.userId == user.id,
//                     );

//                     return (
//                       <div
//                         key={user.id}
//                         className={`relative flex cursor-pointer flex-row items-center p-4 hover:bg-gray-3 ${
//                           currentChat &&
//                           currentChat.members.includes(user.id.toString())
//                             ? "border-l-2 border-red-500 bg-gradient-to-r from-red-100 to-transparent"
//                             : ""
//                         }`}
//                         onClick={() => handleUserClick(user)}
//                       >
//                         <div className="text-gray-500 absolute right-0 top-0 mr-4 mt-3 text-xs">
//                           5 min
//                         </div>
//                         <div
//                           className={`avatar ${isOnline ? "online" : "offline"}`}
//                         >
//                           {" "}
//                           {/* Conditionally render className name */}
//                           <div className="w-15 rounded-full">
//                             <img
//                               src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${user.picture}`}
//                               width={55}
//                               height={55}
//                               alt="User"
//                             />
//                           </div>
//                         </div>
//                         <div className="ml-3 flex flex-grow flex-col">
//                           <div className="text-sm font-medium">
//                             {user.fullname}
//                           </div>
//                           <div className="w-40 truncate text-xs">
//                             Last Message Example
//                           </div>
//                         </div>
//                         <div className="mb-1 ml-2 flex-shrink-0 self-end">
//                           <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
//                             5
//                           </span>
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
//               <div className="relative h-full overflow-hidden pt-2">
//                 <div className="-mx-4 flex h-full flex-col divide-y overflow-y-auto"></div>
//               </div>
//             </div>
//           </div>
//           <div className="flex h-full w-full flex-col bg-white px-4 py-6">
//             {currentChat && (
//               <div className="flex flex-row items-center rounded-2xl px-6 py-4 shadow">
//                 <div
//                   className={`avatar ${onlineUsers.some((onlineUser) => onlineUser.userId == clickedUser?.id) ? "online" : "offline"}`}
//                 >
//                   <div className="w-13 rounded-full">
//                     <img
//                       src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${clickedUser?.picture}`}
//                       width={55}
//                       height={55}
//                       alt="User"
//                     />
//                   </div>
//                 </div>

//                 <div className="ml-3 flex flex-col">
//                   <div className="text-sm font-semibold">
//                     {clickedUser?.fullname}
//                   </div>
//                   <div className="text-gray-500 text-xs">
//                     {onlineUsers.some(
//                       (onlineUser) => onlineUser.userId == clickedUser?.id,
//                     )
//                       ? "Active"
//                       : "Inactive"}
//                   </div>
//                 </div>
//                 <div className="ml-auto">
//                   <ul className="flex flex-row items-center space-x-2">
//                     <li>
//                       <a
//                         href="#"
//                         className="bg-gray-100 hover:bg-gray-200 text-gray-400 flex h-10 w-10 items-center justify-center rounded-full"
//                       >
//                         <span>
//                           <svg
//                             className="h-5 w-5"
//                             fill="currentColor"
//                             stroke="none"
//                             viewBox="0 0 24 24"
//                             xmlns="http://www.w3.org/2000/svg"
//                           >
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth={2}
//                               d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
//                             />
//                           </svg>
//                         </span>
//                       </a>
//                     </li>
//                     <li>
//                       <a
//                         href="#"
//                         className="bg-gray-100 hover:bg-gray-200 text-gray-400 flex h-10 w-10 items-center justify-center rounded-full"
//                       >
//                         <span>
//                           <svg
//                             className="h-5 w-5"
//                             fill="currentColor"
//                             stroke="none"
//                             viewBox="0 0 24 24"
//                             xmlns="http://www.w3.org/2000/svg"
//                           >
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth={2}
//                               d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
//                             />
//                           </svg>
//                         </span>
//                       </a>
//                     </li>
//                     <li>
//                       <a
//                         href="#"
//                         className="bg-gray-100 hover:bg-gray-200 text-gray-400 flex h-10 w-10 items-center justify-center rounded-full"
//                       >
//                         <span>
//                           <svg
//                             className="h-5 w-5"
//                             fill="none"
//                             stroke="currentColor"
//                             viewBox="0 0 24 24"
//                             xmlns="http://www.w3.org/2000/svg"
//                           >
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth={2}
//                               d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
//                             />
//                           </svg>
//                         </span>
//                       </a>
//                     </li>
//                   </ul>
//                 </div>
//               </div>
//             )}

//             <div
//               className="bg-gray-200 flex h-full w-full flex-col overflow-y-auto rounded-lg p-4"
//               ref={scroll}
//             >
//               {messages &&
//                 messages.map((message, index) => (
//                   <div
//                     key={index}
//                     className={`flex ${
//                       message.senderId === userId
//                         ? "mb-4 items-end justify-end"
//                         : "mt-4 items-start justify-start"
//                     }`}
//                   >
//                     {message.senderId === userId ? (
//                       <>
//                         <div
//                           className={`relative rounded-xl ${
//                             message.senderId === userId
//                               ? "bg-indigo-100"
//                               : "bg-white"
//                           } px-4 py-2 text-sm shadow`}
//                           style={{
//                             maxWidth: "60%",
//                             wordWrap: "break-word",
//                           }}
//                         >
//                           <p className="text-sm">{message.text}</p>
//                         </div>
//                       </>
//                     ) : (
//                       <>
//                         <div className="mr-2">
//                           <div
//                             className={`avatar ${
//                               onlineUsers.some(
//                                 (onlineUser) =>
//                                   onlineUser.userId === message.senderId,
//                               )
//                                 ? "online"
//                                 : "offline"
//                             }`}
//                           >
//                             <div className="w-12 rounded-full">
//                               <img
//                                 src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${clickedUser?.picture}`}
//                                 width={55}
//                                 height={55}
//                                 alt="User"
//                               />
//                             </div>
//                           </div>
//                         </div>
//                         <div
//                           className={`relative rounded-xl ${
//                             message.senderId === userId
//                               ? "bg-indigo-100"
//                               : "bg-white"
//                           } px-4 py-2 text-sm shadow`}
//                           style={{
//                             maxWidth: "60%",
//                             wordWrap: "break-word",
//                           }}
//                         >
//                           <p className="text-sm">{message.text}</p>
//                         </div>
//                       </>
//                     )}
//                   </div>
//                 ))}
//             </div>

//             {currentChat && (
//               <div className="flex flex-row items-center">
//                 <div className="flex h-12 w-full flex-row items-center rounded-3xl border px-2">
//                   <button className="text-gray-400 ml-1 flex h-10 w-10 items-center justify-center">
//                     <svg
//                       className="h-5 w-5"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
//                       />
//                     </svg>
//                   </button>
//                   <div className="w-full">
//                     <input
//                       type="text"
//                       className="flex h-10 w-full items-center border border-transparent text-sm focus:outline-none"
//                       placeholder="Type your message...."
//                       onChange={handleMessageChange}
//                     />
//                   </div>
//                   <div className="flex flex-row">
//                     <button className="text-gray-400 flex h-10 w-8 items-center justify-center">
//                       <svg
//                         className="h-5 w-5"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
//                         />
//                       </svg>
//                     </button>
//                     <button className="text-gray-400 ml-1 mr-2 flex h-10 w-8 items-center justify-center">
//                       <svg
//                         className="h-5 w-5"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
//                         />
//                       </svg>
//                     </button>
//                   </div>
//                 </div>

//                 <div>
//                   <button className="ml-5" onClick={handleSendMessage}>
//                     <svg
//                       className="-mr-px h-5 w-5 rotate-90 transform"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
//                       />
//                     </svg>
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </>
//     </DefaultLayout>
//   );
// };

// export default Chat;

"use client";
import React, { useEffect, useState, useRef, useContext } from "react";
import axios from "axios";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { io, Socket } from "socket.io-client";
import { OnlineUsersContext, SocketContext } from "../context/SocketContext";

interface OnlineUser {
  userId: string;
  socketId: string;
}

interface Chat {
  id: number;
  members: string;
  createdAt: string;
  updatedAt: string;
}

interface Message {
  id: number;
  chatId: string;
  senderId: string;
  text: string;
  createdAt: string;
  updatedAt: string;
}

interface User {
  id: string;
  fullname: string;
  picture: string;
}

type Notification = {
  senderId: string;
  isRead: boolean;
  date: Date;
};

const Chat = () => {
  const [userChats, setUserChats] = useState<Chat[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [usersData, setUsersData] = useState<any[]>([]); // Declare usersData state variable
  const [currentChat, setCurrentChat] = useState<Chat | null>(null);
  const [clickedUser, setClickedUser] = useState<any>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isMessagesLoading, setIsMessagesLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [newMessage, setNewMessage] = useState<Message[]>([]);
  const [textMessage, setTextMessage] = useState("");
  // const [socket, setSocket] = useState<Socket | null>(null);
  // const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const socket = useContext(SocketContext);
  const onlineUsers = useContext(OnlineUsersContext);

  const userId = localStorage.getItem("id") || "";

  const currentChatRef = useRef(currentChat);

  const scroll = useRef<HTMLDivElement>(null); // Specify the type of the ref

  useEffect(() => {
    if (scroll.current) {
      scroll.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    if (socket === null || !currentChat) return;

    const membersArray = currentChat.members.split(",");
    const recepientId = membersArray.find((memberId) => memberId !== userId);

    socket.emit("sendMessage", { ...newMessage, recepientId });
  }, [newMessage]);

  useEffect(() => {
    if (socket === null) return;

    socket.on("getMessage", (res) => {
      setMessages((prevMessages) => [...prevMessages, res]);
      console.log("All da mes:", res);
    });
  }, [socket]);

  useEffect(() => {
    if (socket === null) return;

    socket.on("getNotification", (res) => {
      const membersArray = currentChatRef.current?.members.split(",");
      const isChatOpen = membersArray?.some((id) => id === res.senderId);

      if (!currentChatRef.current) {
        setNotifications((prev) => [res, ...prev]);
      } else {
        setNotifications((prev) => [{ ...res, isRead: isChatOpen }, ...prev]);
      }
    });
  }, [socket]);

  console.log("Notifications: ", notifications);
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${userId}`,
        );
        setCurrentUser(response.data);
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
    };

    fetchCurrentUser();
  }, []);

  useEffect(() => {
    const fetchUserChats = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/chats/${userId}`,
        );
        setUserChats(response.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };

    fetchUserChats();
  }, [userId]);

  useEffect(() => {
    const fetchUserMessages = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/messages/${currentChat?.id}`, // Adjust endpoint as per your backend API
        );
        setMessages(response.data);
        setIsMessagesLoading(false); // Update loading state after fetching messages
      } catch (error) {
        console.error("Error fetching messages:", error);
        setIsMessagesLoading(false); // Update loading state in case of error
      }
    };

    fetchUserMessages();
  }, [currentChat]);
  // console.log(messages);

  useEffect(() => {
    const fetchUsersData = async () => {
      if (!userChats.length) return; // Ensure userChats has data before proceeding

      try {
        const otherUserIds = userChats
          .flatMap((chat) => chat.members.split(","))
          .filter((id) => id !== userId);

        const usersDataPromises = otherUserIds.map((id) =>
          axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${id}`),
        );

        const usersDataResponses = await Promise.all(usersDataPromises);

        const usersData = usersDataResponses.map((response) => response.data);

        setUsersData(usersData);

        // console.log("Users data:", usersData);
      } catch (error) {
        console.error("Error fetching other users data:", error);
      }
    };

    fetchUsersData();
  }, [userChats, userId]);

  const handleUserClick = (user: any) => {
    const chat = userChats.find(
      (chat) =>
        chat.members.includes(userId.toString()) &&
        chat.members.includes(user.id.toString()),
    );
    setCurrentChat(chat || null);

    setClickedUser(user);
  };

  // console.log(currentChat);

  const handleMessageChange = (event: any) => {
    setTextMessage(event.target.value);
    // console.log(newMessage);
  };

  const handleSendMessage = async () => {
    try {
      // Prepare the message data
      const messageData = {
        chatId: currentChat?.id, // Assuming currentChat contains the chat information
        senderId: userId, // Assuming userId contains the current user's ID
        text: textMessage,
      };

      // Send the message data to the backend
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/messages`,
        messageData,
      );

      setNewMessage(response.data);
      setMessages((prevMessages) => [...prevMessages, response.data]);

      setTextMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Chat" />
      <>
        {/* component */}
        <div className="text-gray-800 flex h-screen flex-row antialiased">
          <div className="bg-gray-100 flex w-96 flex-shrink-0 flex-row p-4">
            <div className="-mr-4 flex h-full w-full flex-col py-4 pl-4 pr-4">
              <div className="flex flex-row items-center">
                <div className="flex flex-row items-center">
                  <div className="text-xl font-semibold">Messages</div>
                  <div className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-medium text-white">
                    5
                  </div>
                </div>
              </div>
              <div className="mt-5">
                <ul className="flex flex-row items-center justify-between">
                  <li>
                    <a
                      href="#"
                      className="relative flex items-center pb-3 text-xs font-semibold text-indigo-800"
                    >
                      <span>All Conversations</span>
                      <span className="absolute bottom-0 left-0 h-1 w-6 rounded-full bg-indigo-800" />
                    </a>
                  </li>
                </ul>
              </div>
              <div className="mt-5">
                <div className="text-gray-400 text-xs font-semibold uppercase">
                  Users
                </div>
              </div>
              <div className="mt-2">
                <div className="-mx-4 flex flex-col">
                  {/* <div className="flex flex-row items-center border-l-2 border-red-500 bg-gradient-to-r from-red-100 to-transparent p-4"> */}
                  {usersData.map((user) => {
                    const isOnline = onlineUsers.some(
                      (onlineUser) => onlineUser.userId == user.id,
                    );

                    return (
                      <div
                        key={user.id}
                        className={`relative flex cursor-pointer flex-row items-center p-4 hover:bg-gray-3 ${
                          currentChat &&
                          currentChat.members.includes(user.id.toString())
                            ? "border-l-2 border-red-500 bg-gradient-to-r from-red-100 to-transparent"
                            : ""
                        }`}
                        onClick={() => handleUserClick(user)}
                      >
                        <div className="text-gray-500 absolute right-0 top-0 mr-4 mt-3 text-xs">
                          5 min
                        </div>
                        <div
                          className={`avatar ${isOnline ? "online" : "offline"}`}
                        >
                          {" "}
                          {/* Conditionally render className name */}
                          <div className="w-15 rounded-full">
                            <img
                              src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${user.picture}`}
                              width={55}
                              height={55}
                              alt="User"
                            />
                          </div>
                        </div>
                        <div className="ml-3 flex flex-grow flex-col">
                          <div className="text-sm font-medium">
                            {user.fullname}
                          </div>
                          <div className="w-40 truncate text-xs">
                            Last Message Example
                          </div>
                        </div>
                        <div className="mb-1 ml-2 flex-shrink-0 self-end">
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                            5
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="relative h-full overflow-hidden pt-2">
                <div className="-mx-4 flex h-full flex-col divide-y overflow-y-auto"></div>
              </div>
            </div>
          </div>
          <div className="flex h-full w-full flex-col bg-white px-4 py-6">
            {currentChat && (
              <div className="flex flex-row items-center rounded-2xl px-6 py-4 shadow">
                <div
                  className={`avatar ${onlineUsers.some((onlineUser) => onlineUser.userId == clickedUser?.id) ? "online" : "offline"}`}
                >
                  <div className="w-13 rounded-full">
                    <img
                      src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${clickedUser?.picture}`}
                      width={55}
                      height={55}
                      alt="User"
                    />
                  </div>
                </div>

                <div className="ml-3 flex flex-col">
                  <div className="text-sm font-semibold">
                    {clickedUser?.fullname}
                  </div>
                  <div className="text-gray-500 text-xs">
                    {onlineUsers.some(
                      (onlineUser) => onlineUser.userId == clickedUser?.id,
                    )
                      ? "Active"
                      : "Inactive"}
                  </div>
                </div>
                <div className="ml-auto">
                  <ul className="flex flex-row items-center space-x-2">
                    <li>
                      <a
                        href="#"
                        className="bg-gray-100 hover:bg-gray-200 text-gray-400 flex h-10 w-10 items-center justify-center rounded-full"
                      >
                        <span>
                          <svg
                            className="h-5 w-5"
                            fill="currentColor"
                            stroke="none"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                            />
                          </svg>
                        </span>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="bg-gray-100 hover:bg-gray-200 text-gray-400 flex h-10 w-10 items-center justify-center rounded-full"
                      >
                        <span>
                          <svg
                            className="h-5 w-5"
                            fill="currentColor"
                            stroke="none"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                            />
                          </svg>
                        </span>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="bg-gray-100 hover:bg-gray-200 text-gray-400 flex h-10 w-10 items-center justify-center rounded-full"
                      >
                        <span>
                          <svg
                            className="h-5 w-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                            />
                          </svg>
                        </span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            <div
              className="bg-gray-200 flex h-full w-full flex-col overflow-y-auto rounded-lg p-4"
              ref={scroll}
            >
              {messages &&
                messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      message.senderId === userId
                        ? "mb-4 items-end justify-end"
                        : "mt-4 items-start justify-start"
                    }`}
                  >
                    {message.senderId === userId ? (
                      <>
                        <div
                          className={`relative rounded-xl ${
                            message.senderId === userId
                              ? "bg-indigo-100"
                              : "bg-white"
                          } px-4 py-2 text-sm shadow`}
                          style={{
                            maxWidth: "60%",
                            wordWrap: "break-word",
                          }}
                        >
                          <p className="text-sm">{message.text}</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="mr-2">
                          <div
                            className={`avatar ${
                              onlineUsers.some(
                                (onlineUser) =>
                                  onlineUser.userId === message.senderId,
                              )
                                ? "online"
                                : "offline"
                            }`}
                          >
                            <div className="w-12 rounded-full">
                              <img
                                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${clickedUser?.picture}`}
                                width={55}
                                height={55}
                                alt="User"
                              />
                            </div>
                          </div>
                        </div>
                        <div
                          className={`relative rounded-xl ${
                            message.senderId === userId
                              ? "bg-indigo-100"
                              : "bg-white"
                          } px-4 py-2 text-sm shadow`}
                          style={{
                            maxWidth: "60%",
                            wordWrap: "break-word",
                          }}
                        >
                          <p className="text-sm">{message.text}</p>
                        </div>
                      </>
                    )}
                  </div>
                ))}
            </div>

            {currentChat && (
              <div className="flex flex-row items-center">
                <div className="flex h-12 w-full flex-row items-center rounded-3xl border px-2">
                  <button className="text-gray-400 ml-1 flex h-10 w-10 items-center justify-center">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                      />
                    </svg>
                  </button>
                  <div className="w-full">
                    <input
                      type="text"
                      className="flex h-10 w-full items-center border border-transparent text-sm focus:outline-none"
                      placeholder="Type your message...."
                      onChange={handleMessageChange}
                    />
                  </div>
                  <div className="flex flex-row">
                    <button className="text-gray-400 flex h-10 w-8 items-center justify-center">
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                        />
                      </svg>
                    </button>
                    <button className="text-gray-400 ml-1 mr-2 flex h-10 w-8 items-center justify-center">
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                <div>
                  <button className="ml-5" onClick={handleSendMessage}>
                    <svg
                      className="-mr-px h-5 w-5 rotate-90 transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </>
    </DefaultLayout>
  );
};

export default Chat;
