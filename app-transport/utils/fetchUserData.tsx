import axios from "axios";

interface UserData {
  fullname: string;
  phone: string;
  email: string;
  username: string;
  bio: string;
  isFirstLogin: string;
  picture: string;
}

export const fetchUserData = async (): Promise<UserData | null> => {
  const id = localStorage.getItem("id");
  try {
    if (id) {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${id}`,
      );
      return response.data;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
  return null;
};
