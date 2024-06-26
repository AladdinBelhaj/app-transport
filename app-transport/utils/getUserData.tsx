import { useEffect, useState } from "react";
import axios from "axios";

interface UserData {
  fullname: string;
  phone: string;
  email: string;
  username: string;
  role: string;
  bio: string;
  isFirstLogin: string;
  picture: string;
  isBlocked: string;
}

export const useUserData = (): UserData | null => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const id = localStorage.getItem("id");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${id}`,
          );
          setUserData(response.data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [id]);

  return userData;
};

// export const useUserDataById = (userId: string): UserData | null => {
//   const [userData, setUserData] = useState<UserData | null>(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/getById/${userId}`,
//         );
//         setUserData(response.data);
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       }
//     };

//     if (userId) {
//       fetchData();
//     }
//   }, [userId]);

//   return userData;
// };
