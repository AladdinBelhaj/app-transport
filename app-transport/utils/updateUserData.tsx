import axios from "axios";


interface UpdateUserData {
  fullname?: string;
  phone?: string;
  email?: string;
  username?: string;
  bio?: string;
  isFirstLogin?: string;
  picture?: string;
}

export const useUpdateUserData = (): ((data: UpdateUserData) => Promise<void>) => {
    const id = localStorage.getItem("id");

  const updateUserData = async (data: UpdateUserData) => {
    try {
        console.log("data: ", data)
      if (id) {
        await axios.put(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${id}`,
          data
        );
      } else {
        throw new Error("User ID is not available.");
      }
    } catch (error) {
      console.error("Error updating user data:", error);
      throw error;
    }
  };

  return updateUserData;
};
