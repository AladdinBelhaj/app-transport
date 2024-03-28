import { useContext, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { OnlineUsersContext, SocketContext } from "@/app/context/SocketContext";
import axios from "axios";
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

interface Chat {
  id: number;
  members: string;
  createdAt: string;
  updatedAt: string;
}

type Notification = {
  senderId: string;
  recepientId: string;
  isRead: boolean;
  message: string;
  date: Date;
};
const DropdownMessage = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifying, setNotifying] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [currentNotification, setCurrentNotification] = useState<
    Notification[]
  >([]);
  const [currentChat, setCurrentChat] = useState<Chat | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userChats, setUserChats] = useState<Chat[]>([]);
  const [usersData, setUsersData] = useState<any[]>([]);
  const onlineUsers = useContext(OnlineUsersContext);
  const socket = useContext(SocketContext);
  const userId = localStorage.getItem("id");
  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);

  const currentChatRef = useRef(currentChat);
  useEffect(() => {
    const stringCurrentChat = localStorage.getItem("currentChat");
    if (stringCurrentChat !== null) {
      setCurrentChat(JSON.parse(stringCurrentChat));
      currentChatRef.current = JSON.parse(stringCurrentChat);
    } else {
      setCurrentChat(null);
      currentChatRef.current = null;
    }
  }, []);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/notifications/${userId}`)
      .then((response) => {
        const reversedNotifications = response.data.reverse();
        setNotifications(reversedNotifications);
      })
      .catch((error) => {
        console.error("Error fetching notifications:", error);
      });
  }, []);

  useEffect(() => {
    if (socket === null) return;
    socket.on("getNotification", (res) => {
      setNotifications((prevNotifications) => [res, ...prevNotifications]);
      setNotifying(true);
    });

    return () => {
      socket.off("getNotification");
    };
  }, [socket]);

  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });
  const [isLoading, setIsLoading] = useState(true);
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
    if (dropdownOpen) {
      // Update all notifications to set isRead to true when dropdown is opened
      const updatedNotifications = notifications.map((notification) => ({
        ...notification,
        isRead: true,
      }));
      setNotifications(updatedNotifications);

      // Make an HTTP request to update notifications in the database
      axios
        .put(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/notifications/update`,
          {
            notifications: updatedNotifications,
          },
        )
        .then((response) => {
          console.log("Notifications updated in the database:", response.data);
        })
        .catch((error) => {
          console.error("Error updating notifications in the database:", error);
        });
    }
  }, [dropdownOpen]);

  useEffect(() => {
    const fetchUsersData = async () => {
      if (!userChats.length) return;

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
      } catch (error) {
        console.error("Error fetching other users data:", error);
      }
    };

    fetchUsersData();
  }, [userChats, userId]);

  const isUnreadNotification = notifications.some(
    (notification) => !notification.isRead,
  );

  return (
    <li className="relative">
      <Link
        ref={trigger}
        onClick={() => {
          setNotifying(false);
          setDropdownOpen(!dropdownOpen);
        }}
        className="relative flex h-8.5 w-8.5 items-center justify-center rounded-full border-[0.5px] border-stroke bg-gray hover:text-primary dark:border-strokedark dark:bg-meta-4 dark:text-white"
        href="#"
      >
        <span
          className={`absolute -top-0.5 right-0 z-1 h-2 w-2 rounded-full bg-meta-1 ${
            isUnreadNotification ? "inline" : "hidden"
          }`}
        >
          <span className="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-meta-1 opacity-75"></span>
        </span>

        <svg
          className="fill-current duration-300 ease-in-out"
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.9688 1.57495H7.03135C3.43135 1.57495 0.506348 4.41558 0.506348 7.90308C0.506348 11.3906 2.75635 13.8375 8.26885 16.3125C8.40947 16.3687 8.52197 16.3968 8.6626 16.3968C8.85947 16.3968 9.02822 16.3406 9.19697 16.2281C9.47822 16.0593 9.64697 15.75 9.64697 15.4125V14.2031H10.9688C14.5688 14.2031 17.522 11.3625 17.522 7.87495C17.522 4.38745 14.5688 1.57495 10.9688 1.57495ZM10.9688 12.9937H9.3376C8.80322 12.9937 8.35322 13.4437 8.35322 13.9781V15.0187C3.6001 12.825 1.74385 10.8 1.74385 7.9312C1.74385 5.14683 4.10635 2.8687 7.03135 2.8687H10.9688C13.8657 2.8687 16.2563 5.14683 16.2563 7.9312C16.2563 10.7156 13.8657 12.9937 10.9688 12.9937Z"
            fill=""
          />
          <path
            d="M5.42812 7.28442C5.0625 7.28442 4.78125 7.56567 4.78125 7.9313C4.78125 8.29692 5.0625 8.57817 5.42812 8.57817C5.79375 8.57817 6.075 8.29692 6.075 7.9313C6.075 7.56567 5.79375 7.28442 5.42812 7.28442Z"
            fill=""
          />
          <path
            d="M9.00015 7.28442C8.63452 7.28442 8.35327 7.56567 8.35327 7.9313C8.35327 8.29692 8.63452 8.57817 9.00015 8.57817C9.33765 8.57817 9.64702 8.29692 9.64702 7.9313C9.64702 7.56567 9.33765 7.28442 9.00015 7.28442Z"
            fill=""
          />
          <path
            d="M12.5719 7.28442C12.2063 7.28442 11.925 7.56567 11.925 7.9313C11.925 8.29692 12.2063 8.57817 12.5719 8.57817C12.9375 8.57817 13.2188 8.29692 13.2188 7.9313C13.2188 7.56567 12.9094 7.28442 12.5719 7.28442Z"
            fill=""
          />
        </svg>
      </Link>

      {/* <!-- Dropdown Start --> */}
      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute -right-27 mt-2.5 flex w-75 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ${dropdownOpen === true ? "block" : "hidden"}`}
        style={{ maxHeight: "380px", overflowY: "auto" }}
      >
        <div className="px-4.5 py-3">
          <h5 className="text-sm font-medium text-bodydark2">Messages</h5>
        </div>
        <ul className="flex h-auto flex-col overflow-y-auto">
          {notifications.map((notification, index) => {
            const sender = usersData.find(
              (user) => user.id == notification.senderId,
            );
            const currentTime = new Date();
            const messageTime = new Date(notification.date);
            const timeDifference = Math.abs(
              currentTime.getTime() - messageTime.getTime(),
            );
            const minutes = Math.floor(timeDifference / (1000 * 60));
            const hours = Math.floor(minutes / 60);

            // Function to format the time difference
            const formatTimeDifference = () => {
              if (minutes < 60) {
                return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
              } else if (hours < 24) {
                return `${hours} hour${hours > 1 ? "s" : ""} ago`;
              } else {
                return "More than a day ago";
              }
            };

            return (
              <li key={index}>
                <Link
                  className="flex gap-4.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
                  href="/chat"
                >
                  <div className="avatar">
                    <div className="h-12.5 rounded-full">
                      <img
                        width={112}
                        height={112}
                        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${sender?.picture}`}
                        alt={sender?.fullname}
                        style={{
                          width: "auto",
                          height: "auto",
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <h6 className="text-sm font-medium text-black dark:text-white">
                      {sender?.fullname}
                    </h6>
                    <p className="text-sm">{notification.message}</p>
                    <p className="text-xs">{formatTimeDifference()}</p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      {/* <!-- Dropdown End --> */}
    </li>
  );
};

export default DropdownMessage;

// const [usersData, setUsersData] = useState<any[]>([]); // Declare usersData state variable
// const [currentChat, setCurrentChat] = useState<Chat | null>(null);
// const [messages, setMessages] = useState<Message[]>([]);
// const [currentUser, setCurrentUser] = useState<User | null>(null);
// const [socket, setSocket] = useState<Socket | null>(null);
// const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]);
// const [notifications, setNotifications] = useState<Notification[]>([]);

// const userId = localStorage.getItem("id") || "";

// const currentChatRef = useRef(currentChat);

// useEffect(() => {
//   const stringCurrentChat = localStorage.getItem("currentChat");
//   if (stringCurrentChat !== null) {
//     setCurrentChat(JSON.parse(stringCurrentChat));
//     currentChatRef.current = JSON.parse(stringCurrentChat);
//   } else {
//     setCurrentChat(null);
//     currentChatRef.current = null;
//   }
// }, []);

// useEffect(() => {
//   const newSocket = io("http://localhost:9000");
//   setSocket(newSocket);
// }, [currentUser]);

// useEffect(() => {
//   if (socket === null) return;

//   socket.on("getOnlineUsers", (onlineUsers) => {
//     setOnlineUsers(onlineUsers);
//     console.log("Catch these", onlineUsers);
//   });

//   return () => {
//     socket.off("getOnlineUsers");
//   };
// }, [socket]);

// useEffect(() => {
//   if (socket === null) return;

//   socket.on("getMessage", (res) => {
//     setMessages((prevMessages) => [...prevMessages, res]);
//     setNotifying(true);
//   });
// }, [socket, currentChat]);

// useEffect(() => {
//   if (socket === null) return;

//   socket.on("getHeaderNotif", (res) => {
//     setNotifications((prev) => [res, ...prev]);
//     // if (!res.isRead) {
//     //   setNotifying(true);
//     // }
//   });

//   return () => {
//     socket.off("getHeaderNotif");
//   };
// }, [socket]);
