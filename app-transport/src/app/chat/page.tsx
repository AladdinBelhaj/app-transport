"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

interface Chat {
  id: number;
  members: string;
  createdAt: string;
  updatedAt: string;
}

const Chat = () => {
  const [userChats, setUserChats] = useState<Chat[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [usersData, setUsersData] = useState<any[]>([]); // Declare usersData state variable

  const userId = localStorage.getItem("id");

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
  }, [userId]); // Include userId in the dependency array to trigger a re-fetch when userId changes

  useEffect(() => {
    const fetchOtherUsersData = async () => {
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

        setUsersData(usersData); // Set usersData state variable

        console.log("Users data:", usersData);
      } catch (error) {
        console.error("Error fetching other users data:", error);
      }
    };

    fetchOtherUsersData();
  }, [userChats, userId]); // Include userChats and userId in the dependency array to trigger a re-fetch when they change

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
                <div className="ml-auto">
                  <button className="bg-gray-200 text-gray-500 flex h-7 w-7 items-center justify-center rounded-full">
                    <svg
                      className="h-4 w-4 stroke-current"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </button>
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
                  <li>
                    <a
                      href="#"
                      className="text-gray-700 flex items-center pb-3 text-xs font-semibold"
                    >
                      <span>Archived</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-700 flex items-center pb-3 text-xs font-semibold"
                    >
                      <span>Starred</span>
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
                  {usersData.map((user) => (
                    <div
                      key={user.id}
                      className="relative flex flex-row items-center p-4"
                    >
                      <div className="text-gray-500 absolute right-0 top-0 mr-4 mt-3 text-xs">
                        5 min
                      </div>
                      <img src={user.picture} alt="" />{" "}
                      {/* Assuming user.picture contains the image URL */}
                      <div className="ml-3 flex flex-grow flex-col">
                        <div className="text-sm font-medium">
                          {user.fullname} {/* Render user's fullname */}
                        </div>
                        {/* Render last message example */}
                        <div className="w-40 truncate text-xs">
                          Last Message Example
                        </div>
                      </div>
                      {/* Render the count of unread messages */}
                      <div className="mb-1 ml-2 flex-shrink-0 self-end">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                          5
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative h-full overflow-hidden pt-2">
                <div className="-mx-4 flex h-full flex-col divide-y overflow-y-auto"></div>
                <div className="absolute bottom-0 right-0 mr-2">
                  <button className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500 text-white shadow-sm">
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex h-full w-full flex-col bg-white px-4 py-6">
            <div className="flex flex-row items-center rounded-2xl px-6 py-4 shadow">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-500 text-pink-100">
                T
              </div>
              <div className="ml-3 flex flex-col">
                <div className="text-sm font-semibold">UI Art Design</div>
                <div className="text-gray-500 text-xs">Active</div>
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
            <div className="h-full overflow-hidden py-4">
              <div className="h-full overflow-y-auto">
                <div className="grid grid-cols-12 gap-y-2">
                  <div className="col-start-1 col-end-8 rounded-lg p-3">
                    <div className="flex flex-row items-center">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-indigo-500">
                        A
                      </div>
                      <div className="relative ml-3 rounded-xl bg-white px-4 py-2 text-sm shadow">
                        <div>Hey How are you today?</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-start-1 col-end-8 rounded-lg p-3">
                    <div className="flex flex-row items-center">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-indigo-500">
                        A
                      </div>
                      <div className="relative ml-3 rounded-xl bg-white px-4 py-2 text-sm shadow">
                        <div>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit. Vel ipsa commodi illum saepe numquam maxime
                          asperiores voluptate sit, minima perspiciatis.
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-start-6 col-end-13 rounded-lg p-3">
                    <div className="flex flex-row-reverse items-center justify-start">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-indigo-500">
                        A
                      </div>
                      <div className="relative mr-3 rounded-xl bg-indigo-100 px-4 py-2 text-sm shadow">
                        <div>Im ok what about you?</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-start-6 col-end-13 rounded-lg p-3">
                    <div className="flex flex-row-reverse items-center justify-start">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-indigo-500">
                        A
                      </div>
                      <div className="relative mr-3 rounded-xl bg-indigo-100 px-4 py-2 text-sm shadow">
                        <div>
                          Lorem ipsum dolor sit, amet consectetur adipisicing. ?
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-start-1 col-end-8 rounded-lg p-3">
                    <div className="flex flex-row items-center">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-indigo-500">
                        A
                      </div>
                      <div className="relative ml-3 rounded-xl bg-white px-4 py-2 text-sm shadow">
                        <div>Lorem ipsum dolor sit amet !</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-start-6 col-end-13 rounded-lg p-3">
                    <div className="flex flex-row-reverse items-center justify-start">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-indigo-500">
                        A
                      </div>
                      <div className="relative mr-3 rounded-xl bg-indigo-100 px-4 py-2 text-sm shadow">
                        <div>
                          Lorem ipsum dolor sit, amet consectetur adipisicing. ?
                        </div>
                        <div className="text-gray-500 absolute bottom-0 right-0 -mb-5 mr-2 text-xs">
                          Seen
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-start-1 col-end-8 rounded-lg p-3">
                    <div className="flex flex-row items-center">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-indigo-500">
                        A
                      </div>
                      <div className="relative ml-3 rounded-xl bg-white px-4 py-2 text-sm shadow">
                        <div>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Perspiciatis, in.
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-start-1 col-end-8 rounded-lg p-3">
                    <div className="flex flex-row items-center">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-indigo-500">
                        A
                      </div>
                      <div className="relative ml-3 rounded-xl bg-white px-4 py-2 text-sm shadow">
                        <div className="flex flex-row items-center">
                          <button className="flex h-8 w-10 items-center justify-center rounded-full bg-indigo-600 hover:bg-indigo-800">
                            <svg
                              className="h-6 w-6 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.5"
                                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.5"
                                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          </button>
                          <div className="ml-4 flex flex-row items-center space-x-px">
                            <div className="bg-gray-500 h-2 w-1 rounded-lg" />
                            <div className="bg-gray-500 h-2 w-1 rounded-lg" />
                            <div className="bg-gray-500 h-4 w-1 rounded-lg" />
                            <div className="bg-gray-500 h-8 w-1 rounded-lg" />
                            <div className="bg-gray-500 h-8 w-1 rounded-lg" />
                            <div className="bg-gray-500 h-10 w-1 rounded-lg" />
                            <div className="bg-gray-500 h-10 w-1 rounded-lg" />
                            <div className="bg-gray-500 h-12 w-1 rounded-lg" />
                            <div className="bg-gray-500 h-10 w-1 rounded-lg" />
                            <div className="bg-gray-500 h-6 w-1 rounded-lg" />
                            <div className="bg-gray-500 h-5 w-1 rounded-lg" />
                            <div className="bg-gray-500 h-4 w-1 rounded-lg" />
                            <div className="bg-gray-500 h-3 w-1 rounded-lg" />
                            <div className="bg-gray-500 h-2 w-1 rounded-lg" />
                            <div className="bg-gray-500 h-2 w-1 rounded-lg" />
                            <div className="bg-gray-500 h-2 w-1 rounded-lg" />
                            <div className="bg-gray-500 h-10 w-1 rounded-lg" />
                            <div className="bg-gray-500 h-2 w-1 rounded-lg" />
                            <div className="bg-gray-500 h-10 w-1 rounded-lg" />
                            <div className="bg-gray-500 h-8 w-1 rounded-lg" />
                            <div className="bg-gray-500 h-8 w-1 rounded-lg" />
                            <div className="bg-gray-500 h-1 w-1 rounded-lg" />
                            <div className="bg-gray-500 h-1 w-1 rounded-lg" />
                            <div className="bg-gray-500 h-2 w-1 rounded-lg" />
                            <div className="bg-gray-500 h-8 w-1 rounded-lg" />
                            <div className="bg-gray-500 h-8 w-1 rounded-lg" />
                            <div className="bg-gray-500 h-2 w-1 rounded-lg" />
                            <div className="bg-gray-500 h-2 w-1 rounded-lg" />
                            <div className="bg-gray-500 h-2 w-1 rounded-lg" />
                            <div className="bg-gray-500 h-2 w-1 rounded-lg" />
                            <div className="bg-gray-500 h-4 w-1 rounded-lg" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
              <div className="ml-6">
                <button className="bg-gray-200 hover:bg-gray-300 flex h-10 w-10 items-center justify-center rounded-full text-indigo-800 text-white">
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
          </div>
        </div>
      </>
    </DefaultLayout>
  );
};

export default Chat;

{
  /* <div className="flex flex-row items-center border-l-2 border-red-500 bg-gradient-to-r from-red-100 to-transparent p-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-pink-500 font-bold text-pink-300">
                      T
                    </div>
                    <div className="ml-3 flex flex-grow flex-col">
                      <div className="flex items-center">
                        <div className="text-sm font-medium">UI Art Design</div>
                        <div className="ml-2 h-2 w-2 rounded-full bg-green-500" />
                      </div>
                      <div className="w-40 truncate text-xs">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Debitis, doloribus?
                      </div>
                    </div>
                  </div> */
}
