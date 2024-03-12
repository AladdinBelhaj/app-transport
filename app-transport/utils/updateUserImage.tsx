import axios, { AxiosRequestConfig } from "axios";

interface UpdateUserImage {
  fullname?: string;
  phone?: string;
  email?: string;
  username?: string;
  bio?: string;
  isFirstLogin?: string;
  picture?: string;
}

export const useUpdateUserImage = (): ((data: FormData) => Promise<void>) => {
  const id = localStorage.getItem("id");

  const updateUserImage = async (data: FormData) => {
    try {
      console.log("data: ", data);
      if (id) {
        const config: AxiosRequestConfig = {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };

        await axios.put(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/imageData/${id}`,
          data,
          config,
        );
      } else {
        throw new Error("User ID is not available.");
      }
    } catch (error) {
      console.error("Error updating user data:", error);
      throw error;
    }
  };

  return updateUserImage;
};
