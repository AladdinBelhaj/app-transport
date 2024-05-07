// "use client";
// import ECommerce from "@/components/Dashboard/E-commerce";
// import AuthGuard from "@/components/Auth/AuthGuard";

// import DefaultLayout from "@/components/Layouts/DefaultLayout";
// import { useEffect, useState } from "react";
// import { io, Socket } from "socket.io-client";
// // import { getToken } from "../../utils/auth";
// // import { useRouter } from "next/navigation";

// interface OnlineUser {
//   userId: string;
//   socketId: string;
// }

// export default function Home() {
//   const userId = localStorage.getItem("id");
//   const [socket, setSocket] = useState<Socket | null>(null);
//   const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]);
//   useEffect(() => {
//     const newSocket = io("http://localhost:9000");
//     setSocket(newSocket);
//   }, []);

//   useEffect(() => {
//     if (socket === null) return;

//     socket.emit("addNewUser", userId);

//     socket.on("getOnlineUsers", (onlineUsers) => {
//       setOnlineUsers(onlineUsers);
//     });

//     return () => {
//       socket.off("getOnlineUsers");
//     };
//   }, [socket]);

//   return (
//     <AuthGuard redirect={"/auth/signin"}>
//       <DefaultLayout>
//         <ECommerce />
//       </DefaultLayout>
//     </AuthGuard>
//   );
// }
"use client";
import ECommerce from "@/components/Dashboard/E-commerce";
import AuthGuard from "@/components/Auth/AuthGuard";
import { useEffect } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import CrispChat from "@/components/CrispChat/CrispChat";
import { useUserData } from "../../utils/getUserData";
import { useRouter } from "next/navigation";

export default function Home() {
  const userData = useUserData();

  console.log(userData?.isBlocked);

  useEffect(() => {
    if (userData?.isBlocked && userData.isBlocked !== "false") {
      const modal = document.getElementById(
        "my_modal_1",
      ) as HTMLDialogElement | null;
      if (modal) {
        modal.showModal();
      }
    }
  }, [userData?.isBlocked]);
  const router = useRouter();
  function handleLogout() {
    localStorage.removeItem("token");
    router.push("/auth/signin");
  }

  // Prevent modal from closing when escape key is pressed
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
      }
    };

    const modal = document.getElementById(
      "my_modal_1",
    ) as HTMLDialogElement | null;
    if (modal) {
      modal.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      if (modal) {
        modal.removeEventListener("keydown", handleKeyDown);
      }
    };
  }, []);

  return (
    <AuthGuard redirect={"/auth/signin"}>
      <DefaultLayout>
        <CrispChat />
        <dialog id="my_modal_1" className="modal">
          <div className="modal-box">
            <h3 className="text-lg font-bold " style={{ color: "black" }}>
              Welcome back.
            </h3>
            <p className="py-4" style={{ color: "black" }}>
              Your account has been blocked for: {userData?.isBlocked}
            </p>
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn" onClick={handleLogout}>
                  Close
                </button>
              </form>
            </div>
          </div>
        </dialog>
        <ECommerce />
      </DefaultLayout>
    </AuthGuard>
  );
}

// export default function Home() {
//   const userData = useUserData();
//   useEffect(() => {
//     if (userData?.isBlocked !== "0") {
//       const modal = document.getElementById(
//         "my_modal_1",
//       ) as HTMLDialogElement | null;
//       if (modal) {
//         modal.showModal();
//       }
//     }
//   }, [userData?.isBlocked]);

//   const router = useRouter();
//   function handleLogout() {
//     localStorage.removeItem("token");
//     router.push("/auth/signin");
//   }

//   return (
//     <AuthGuard redirect={"/auth/signin"}>
//       <DefaultLayout>
//         <CrispChat />
//         <dialog id="my_modal_1" className="modal">
//           <div className="modal-box">
//             <h3 className="text-lg font-bold " style={{ color: "black" }}>
//               Welcome back.
//             </h3>
//             <p className="py-4" style={{ color: "black" }}>
//               Your account has been blocked for: {userData?.isBlocked}
//             </p>
//             <div className="modal-action">
//               <form method="dialog">
//                 {/* if there is a button in form, it will close the modal */}
//                 <button className="btn" onClick={handleLogout}>
//                   Close
//                 </button>
//               </form>
//             </div>
//           </div>
//         </dialog>
//         <ECommerce />
//       </DefaultLayout>
//     </AuthGuard>
//   );
// }
