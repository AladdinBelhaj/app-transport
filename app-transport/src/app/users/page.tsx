"use client";

import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Link from "next/link";
import { SocketContext } from "../context/SocketContext";
import ReadUserModal from "./ReadUserModal";

interface TripData {
  id: number;
  departCountry: string;
  departState: string;
  destCountry: string;
  desState: string;
  departDate: string;
  arrivDate: string;
  maxWeight: string;
  description: string;
  transporterId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

// interface UserData {
//   id: string;
//   fullname: string;
//   phone: string;
//   email: string;
//   username: string;
//   role: string;
//   bio: string;
//   isFirstLogin: string;
//   picture: string;
//   createdAt: string;
//   updatedAt: string;
// }

// const Users = () => {
//   const [userData, setUserData] = useState<UserData[] | null>(null);
//   useEffect(() => {
//     axios
//       .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users`)
//       .then((response) => {
//         setUserData(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching users:", error);
//       });
//   }, []);
//   console.log("Dis dat:", userData);

//   return (
//     <DefaultLayout>
//       <Breadcrumb pageName="Current Users" />
//       <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
//         <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
//           Users List
//         </h4>

//         <div className="flex flex-col">
//           <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
//             <div className="p-2.5 xl:p-5">
//               <h5 className="text-sm font-medium uppercase xsm:text-base">
//                 Full Name
//               </h5>
//             </div>
//             <div className="p-2.5 text-center xl:p-5">
//               <h5 className="text-sm font-medium uppercase xsm:text-base">
//                 Role
//               </h5>
//             </div>
//             <div className="p-2.5 text-center xl:p-5">
//               <h5 className="text-sm font-medium uppercase xsm:text-base">
//                 Email
//               </h5>
//             </div>
//             <div className="hidden p-2.5 text-center sm:block xl:p-5">
//               <h5 className="text-sm font-medium uppercase xsm:text-base">
//                 Joined On
//               </h5>
//             </div>
//             <div className="hidden p-2.5 text-center sm:block xl:p-5">
//               <h5 className="text-sm font-medium uppercase xsm:text-base">
//                 Action
//               </h5>
//             </div>
//           </div>

//           <div
//             className={`grid grid-cols-3 sm:grid-cols-5 ${"border-b border-stroke dark:border-strokedark"}`}
//           >
//             <div className="flex items-center gap-3 p-2.5 xl:p-5">
//               <div className="flex-shrink-0">
//                 <img src="" alt="" />
//               </div>
//               <p className="hidden text-black dark:text-white sm:block">aaa</p>
//             </div>

//             <div className="flex items-center justify-center p-2.5 xl:p-5">
//               <p className="text-black dark:text-white">K</p>
//             </div>

//             <div className="flex items-center justify-center p-2.5 xl:p-5">
//               <p className="text-meta-3">$aa</p>
//             </div>

//             <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
//               <p className="text-black dark:text-white">aa</p>
//             </div>

//             <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
//               <p className="text-meta-5">aa%</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </DefaultLayout>
//   );
// };

// export default Users;

interface User {
  id: string;
  fullname: string;
  phone: string;
  email: string;
  username: string;
  role: string;
  bio: string;
  isFirstLogin: string;
  picture: string;
  createdAt: string;
  updatedAt: string;
  blocked: string;
}

const Users = () => {
  const [userData, setUserData] = useState<User[] | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
    console.log(user);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users`)
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []); // Empty dependency array to run the effect only once on component mount

  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${month}, ${year}`;
  }

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Current Users" />

      {isModalOpen && ( // Render the modal only if isOpen prop is true
        <div
          id="readProductModal"
          tabIndex={-1}
          aria-hidden="true"
          className="fixed inset-0 z-50 flex h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden md:inset-0 md:h-full"
          style={{ zIndex: 9999 }}
        >
          <div
            className="fixed inset-0 bg-black opacity-50" // Close the modal if clicked outside
          ></div>
          <div className="relative h-full w-full max-w-xl p-4 md:h-auto">
            <div className="dark:bg-gray-800 relative rounded-lg bg-white p-4 shadow sm:p-5">
              <div className="mb-4 flex justify-between rounded-t sm:mb-5">
                <div className="text-gray-900 md:text-md text-lg dark:text-white">
                  <h3 className="font-semibold">
                    Reason for blocking the user?
                  </h3>
                </div>
                <div>
                  <button
                    type="button"
                    className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 inline-flex rounded-lg bg-transparent p-1.5 text-sm dark:hover:text-white"
                    onClick={closeModal}
                  >
                    <svg
                      aria-hidden="true"
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
              </div>

              <textarea
                className="border-gray-300 dark:bg-gray-700 h-24 w-full rounded-md border p-2 focus:outline-none focus:ring focus:ring-blue-400 dark:text-white"
                placeholder="Enter reason here..."
              ></textarea>

              <div className="flex items-center justify-between">
                {selectedUser?.blocked == "ongoing" ? (
                  <button
                    type="button"
                    className="text-gray-900 border-gray-200 hover:bg-gray-100 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 rounded-lg border bg-red-500 px-5 py-2.5  text-sm font-medium text-white hover:bg-red-700 focus:z-10 focus:outline-none focus:ring-4 dark:hover:text-white"
                  >
                    <svg
                      aria-hidden="true"
                      className="-ml-1 mr-1 inline-block h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m15 9-6 6m0 0l6 6m-6-6H3"
                      />
                    </svg>
                    Block User
                  </button>
                ) : (
                  <button
                    type="button"
                    className="text-gray-900 border-gray-200 hover:bg-gray-100 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 rounded-lg border bg-green-500 px-5 py-2.5  text-sm font-medium text-white hover:bg-green-700 focus:z-10 focus:outline-none focus:ring-4 dark:hover:text-white"
                  >
                    <svg
                      aria-hidden="true"
                      className="-ml-1 mr-1 inline-block h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      ></path>
                    </svg>
                    Unblock User
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          Users List
        </h4>

        <div className="flex flex-col">
          <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
            <div className="p-2.5 xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Full Name
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Role
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Email
              </h5>
            </div>
            <div className="hidden p-2.5 text-center sm:block xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Joined On
              </h5>
            </div>
            <div className="hidden p-2.5 text-center sm:block xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Action
              </h5>
            </div>
          </div>

          {userData &&
            userData.map((user) => (
              <div
                key={user.id}
                className={`grid grid-cols-3 sm:grid-cols-5 ${"border-b border-stroke dark:border-strokedark"}`}
              >
                <div className="flex items-center gap-3 p-2.5 xl:p-5">
                  <div className="flex-shrink-0">
                    <img
                      src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${user.picture}`}
                      alt={user.fullname}
                      className="h-13 w-13 rounded-full"
                    />
                  </div>

                  <a
                    href={`/profile/${user.id}`}
                    className="hidden text-blue-400 dark:text-blue-400 sm:block" // Adjust the color classes as needed
                  >
                    {user.fullname}
                  </a>
                </div>

                <div className="flex items-center justify-center p-2.5 xl:p-5">
                  <p className="text-black dark:text-white">{user.role}</p>
                </div>

                <div className="flex items-center justify-center p-2.5 xl:p-5">
                  <p className="text-black">{user.email}</p>
                </div>

                <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                  <p className="text-black dark:text-white">
                    {formatDate(user.createdAt)}
                  </p>
                </div>

                <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                  <button
                    className="hover:text-primary"
                    onClick={() => openModal(user)}
                  >
                    <svg
                      className="fill-current"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.20624 8.99981 3.20624C14.5686 3.20624 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 8.99999C2.4748 10.0406 4.89356 13.5562 8.99981 13.5562C13.1061 13.5562 15.5248 10.0406 16.1436 8.99999C15.5248 7.95936 13.1061 4.44374 8.99981 4.44374C4.89356 4.44374 2.4748 7.95936 1.85605 8.99999Z"
                        fill=""
                      />
                      <path
                        d="M9 11.3906C7.67812 11.3906 6.60938 10.3219 6.60938 9C6.60938 7.67813 7.67812 6.60938 9 6.60938C10.3219 6.60938 11.3906 7.67813 11.3906 9C11.3906 10.3219 10.3219 11.3906 9 11.3906ZM9 7.875C8.38125 7.875 7.875 8.38125 7.875 9C7.875 9.61875 8.38125 10.125 9 10.125C9.61875 10.125 10.125 9.61875 10.125 9C10.125 8.38125 9.61875 7.875 9 7.875Z"
                        fill=""
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Users;

{
  /* <ReadUserModal          isOpen={isModalOpen}
closeModal={closeModal}
selectedUser{selectedUser}>

  </ReadUserModal> */
}
